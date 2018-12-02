import { compose, flatten, keys, map, pickAll, valuesIn } from 'ramda';
import { getFileForPath } from '../utils/fs';

type Dependencies = ReadonlyArray<Record<string, string>>;
interface PackageJson {
  readonly dependencies?: Dependencies;
  readonly devDependencies?: Dependencies;
}

// TODO: Fix lazy anys
const toDependencyKeys = compose<PackageJson, any, any, ReadonlyArray<string>>(
  flatten,
  map(keys),
  valuesIn,
);

const getDependencies = compose(
  toDependencyKeys,
  pickAll(['dependencies', 'devDependencies']),
);

export default (path: string): Promise<ReadonlyArray<string>> =>
  getFileForPath(path)
    .then(f => Promise.resolve(JSON.parse(f)))
    .then(f => Promise.resolve(getDependencies(f)));
