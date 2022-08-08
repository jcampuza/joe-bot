import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const readJsonFile = (path: string) => {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
};

export const writeJsonFile = (path: string, data: any) => {
  const formatted = JSON.stringify(data, undefined, '\t');

  return fs.writeFileSync(path, formatted);
};

export const uuid = () => uuidv4();

type Rejected = { status: 'rejected'; result: any };
type Fulfilled<T> = { status: 'fulfilled'; result: T };
type Reflected<T> = Rejected | Fulfilled<T>;

export const reflect = async <T>(
  promise: Promise<T>
): Promise<Reflected<T>> => {
  try {
    const value = await promise;

    return { status: 'fulfilled', result: value };
  } catch (err) {
    return { status: 'rejected', result: err };
  }
};

export const isFulfilled = <T>(
  reflection: Reflected<T>
): reflection is Fulfilled<T> => reflection.status === 'fulfilled';

export const isRejected = <T>(
  reflection: Reflected<T>
): reflection is Rejected => reflection.status === 'rejected';
