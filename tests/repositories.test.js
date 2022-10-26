const path = require('path');

const repositories = require('../repositories');

const repo = path.join(__dirname, '..');

describe('when passing a repository', () => {
  test('should throw an error', () => {
    expect(() => repositories(repo)).toThrow(/There are no repositories/);
  });
});

describe('when a directory without subdirectories', () => {
  test('should throw an error', () => {
    expect(() => repositories(__dirname)).toThrow(/There are no folders/);
  })
});

describe('when passing a directory containing repositories', () => {
  test('should return with the repositories', () => {
    const dir = path.join(repo, '..');
    const actual = repositories(dir);

    const heads = path.join(repo, '.git', 'logs', 'refs', 'heads');

    expect(actual).toContain(heads);
  })
});
