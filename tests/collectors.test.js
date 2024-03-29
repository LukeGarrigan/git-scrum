const path = require('path');

const { collectRepositories } = require('../collectors');

const repo = path.resolve();

describe('collectRepositories()', () => {
    describe('when passing a repository', () => {
        test('should throw an error', () => {
            expect(() => collectRepositories(repo)).toThrow(/There are no repositories/);
        });
    });

    describe('when a directory without subdirectories', () => {
        test('should throw an error', () => {
            const testDir = path.join(repo, 'tests');
            expect(() => collectRepositories(testDir)).toThrow(/There are no folders/);
        });
    });

    describe('when passing a directory containing repositories', () => {
        test('should return with the repositories', () => {
            const dir = path.join(repo, '..');
            const actual = collectRepositories(dir);

            const heads = path.join(repo, '.git', 'logs', 'refs', 'heads');

            expect(actual).toContain(heads);
        });
    });
});
