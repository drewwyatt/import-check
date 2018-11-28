const fs = require('fs');
const glob = require('glob');

const IMPORT_REGEX = /import (?:\*.*|{[^}]*}|\w+)?(?: from )?'((?:\w|@|\/|\.)+)';/gm

const getMatches = string => {
  let matches = [];
  let match;
  while (match = IMPORT_REGEX.exec(string)) {
    matches.push(match[1]);
  }
  return matches;
}


glob('../jupiter/packages/@members/class-detail/**.ts?(x)', null, (err, files) => {
  if (err) {
    console.error(err);
  } else {
    console.log(files);
    files.forEach(path => {
      fs.readFile(path, 'utf8', (readErr, data) => {
        if (readErr) {
          console.error(readErr);
        } else {
          console.log(`------- file: ${path} -------`);
          console.log(data);
          console.log('======= matches =======');
          console.log(getMatches(data));
          console.log('=======================');
        }
      });
    });
  }
});
