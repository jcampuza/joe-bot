import fs from 'fs';

export const readJsonFile = (path: string) => {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  } catch {
    console.log('Error reading file', path);

    return {};
  }
};

export const writeJsonFile = (path: string, data: any) => {
  const formatted = JSON.stringify(data, undefined, '\t');

  return fs.writeFileSync(path, formatted);
};
