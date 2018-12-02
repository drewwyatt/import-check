import { readFile } from 'fs';
import glob from 'glob';
import * as R from 'ramda';

const IMPORT_REGEX = /import (?:\*.*|{[^}]*}|\w+)?(?: from )?'((?:\w|@|\/|\.)+)';/gm;

// tslint:disable
const getMatches = (str: string) => {
  const matches = [];
  let match;
  while ((match = IMPORT_REGEX.exec(str))) {
    matches.push(match[1]);
  }
  return matches;
};
// tslint:enable

const getFilePathsForPattern = (pat: string) =>
  new Promise<ReadonlyArray<string>>((res, rej) =>
    glob(pat, {}, (err, files) =>
      err || !files.length
        ? rej(err || 'No files found for pattern')
        : res(files),
    ),
  );

const getFileForPath = (path: string) =>
  new Promise<string>((res, rej) =>
    readFile(path, 'utf8', (err, file) => (err ? rej(err) : res(file))),
  );

const getFilesForPaths = (paths: ReadonlyArray<string>) =>
  Promise.all<string>(paths.map(p => getFileForPath(p)));

const getMatchesForFile = (file: string) => getMatches(file);

const getMatchesForFiles = (files: ReadonlyArray<string>) =>
  Promise.resolve(files.map(getMatchesForFile));

const flatten = (arr: ReadonlyArray<ReadonlyArray<string>>) =>
  Promise.resolve(R.flatten<string>(arr));

const stripRelative = (arr: ReadonlyArray<string>) =>
  Promise.resolve(arr.filter(a => a[0] !== '.'));

const uniq = (arr: ReadonlyArray<string>) => Promise.resolve(R.uniq(arr));

const sort = (arr: ReadonlyArray<string>) =>
  Promise.resolve(R.sort((a: string, b: string) => a.localeCompare(b), arr));

export default (pattern: string) =>
  getFilePathsForPattern(pattern)
    .then(getFilesForPaths)
    .then(getMatchesForFiles)
    .then(flatten)
    .then(stripRelative)
    .then(uniq)
    .then(sort);
