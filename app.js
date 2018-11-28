const fs = require('fs');
const glob = require('glob');

const IMPORT_REGEX = /import (?:\*.*|{[^}]*}|\w+)?(?: from )?'((?:\w|@|\/|\.)+)';/gm
const pattern = '../jupiter/packages/@members/class-detail/**.ts?(x)';

const getMatches = string => {
  let matches = [];
  let match;
  while (match = IMPORT_REGEX.exec(string)) {
    matches.push(match[1]);
  }
  return matches;
}

const getFilePathsForPattern = pat => new Promise((res, rej) => glob(pat, null, (err, files) =>
  err ? rej(err) : res(files)
));

const getFileForPath = path => new Promise((res, rej) => fs.readFile(path, 'utf8', (err, file) => err ? rej(err) : res(file)));
const getFilesForPaths = paths => Promise.all(paths.map(p => getFileForPath(p)));
const getMatchesForFile = file => getMatches(file);
const getMatchesForFiles = files => Promise.resolve(files.map(getMatchesForFile));
const flatten = arr => Promise.resolve(arr.reduce((a, b) => a.concat(b), []));
const stripRelative = arr => Promise.resolve(arr.filter(a => a[0] !== '.'));
const toSet = arr => Promise.resolve(new Set(arr));

getFilePathsForPattern(pattern)
  .then(getFilesForPaths)
  .then(getMatchesForFiles)
  .then(flatten)
  .then(stripRelative)
  .then(toSet)
  .then(d => console.log(d))
  .catch(e => console.error(e));


// glob('../jupiter/packages/@members/class-detail/**.ts?(x)', null, (err, files) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(files);
//     files.forEach(path => {
//       fs.readFile(path, 'utf8', (readErr, data) => {
//         if (readErr) {
//           console.error(readErr);
//         } else {
//           console.log(`------- file: ${path} -------`);
//           console.log(data);
//           console.log('======= matches =======');
//           console.log(getMatches(data));
//           console.log('=======================');
//         }
//       });
//     });
//   }
// });
