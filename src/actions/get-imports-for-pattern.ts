import { readFile } from 'fs';
import glob from 'glob';
import * as R from 'ramda';

const IMPORT_REGEX = /import (?:\*.*|{[^}]*}|\w+)?(?: from )?'((?:\w|@|\/|\.)+)';/gm

const getMatches = (str: string) => {
  let matches = [];
  let match;
  while (match = IMPORT_REGEX.exec(str)) {
    matches.push(match[1]);
  }
  return matches;
};

const getFilePathsForPattern = (pat: string) => new Promise<string[]>((res, rej) => glob(pat, {}, (err, files) =>
  err || !files.length ? rej(err || 'No files found for pattern') : res(files)
));

const getFileForPath = (path: string) => new Promise<string>((res, rej) => readFile(path, 'utf8', (err, file) => err ? rej(err) : res(file)));
const getFilesForPaths = (paths: string[]) => Promise.all<string>(paths.map(p => getFileForPath(p)));
const getMatchesForFile = (file: string) => getMatches(file);
const getMatchesForFiles = (files: string[]) => Promise.resolve(files.map(getMatchesForFile));
const flatten = (arr: string[][]) => Promise.resolve(R.flatten<string>(arr));
const stripRelative = (arr: string[]) => Promise.resolve(arr.filter(a => a[0] !== '.'));
const uniq = (arr: string[]) => Promise.resolve(R.uniq(arr));
const sort = (arr: string[]) => Promise.resolve(arr.sort())

module.exports = (pattern: string) =>
  getFilePathsForPattern(pattern)
    .then(getFilesForPaths)
    .then(getMatchesForFiles)
    .then(flatten)
    .then(stripRelative)
    .then(uniq)
    .then(sort);
