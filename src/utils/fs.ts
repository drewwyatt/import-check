import { readFile } from 'fs';

export const getFileForPath = (path: string) =>
  new Promise<string>((res, rej) =>
    readFile(path, 'utf8', (err, file) => (err ? rej(err) : res(file))),
  );

export const getFilesForPaths = (paths: ReadonlyArray<string>) =>
  Promise.all<string>(paths.map(p => getFileForPath(p)));
