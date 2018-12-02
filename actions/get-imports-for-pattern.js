const fs = require('fs');
const glob = require('glob');
const R = require('ramda');

const IMPORT_REGEX = /import (?:\*.*|{[^}]*}|\w+)?(?: from )?'((?:\w|@|\/|\.)+)';/gm

const getMatches = string => {
  let matches = [];
  let match;
  while (match = IMPORT_REGEX.exec(string)) {
    matches.push(match[1]);
  }
  return matches;
};

const getFilePathsForPattern = pat => new Promise((res, rej) => glob(pat, null, (err, files) =>
  err ? rej(err) : res(files)
));

const getFileForPath = path => new Promise((res, rej) => fs.readFile(path, 'utf8', (err, file) => err ? rej(err) : res(file)));
const getFilesForPaths = paths => Promise.all(paths.map(p => getFileForPath(p)));
const getMatchesForFile = file => getMatches(file);
const getMatchesForFiles = files => Promise.resolve(files.map(getMatchesForFile));
const flatten = arr => Promise.resolve(R.flatten(arr));
const stripRelative = arr => Promise.resolve(arr.filter(a => a[0] !== '.'));
const uniq = arr => Promise.resolve(R.uniq(arr));

module.exports = pattern => {
  getFilePathsForPattern(pattern)
    .then(getFilesForPaths)
    .then(getMatchesForFiles)
    .then(flatten)
    .then(stripRelative)
    .then(uniq)
    .then(d => console.log(d))
    .catch(e => console.error(e));
};
