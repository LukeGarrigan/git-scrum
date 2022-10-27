const fs = require('fs');
const path = require('path');

const Branch = require('./branch');
const Commit = require('./commit');

function readDir(dir) {
    return fs.readdirSync(dir).map((entry) => path.join(dir, entry));
}

function isDirectory(path) {
    try {
        return fs.lstatSync(path).isDirectory();
    } catch {
        return false;
    }
}

function collectRepositories(dir) {
    const entries = readDir(dir);

    const directories = entries.filter(isDirectory);

    if (directories.length === 0) {
        throw new Error('There are no folders in this directory');
    }

    const repositories = directories.map((dir) => path.join(dir, '.git', 'logs', 'refs', 'heads')).filter(isDirectory);

    if (repositories.length === 0) {
        throw new Error('There are no repositories in any of the folders in this directory');
    }

    return repositories;
}

function getAllCommitsByBranches(repo) {
    const branches = readDir(repo);

    return branches.flatMap((currentPath) => {
        if (fs.lstatSync(currentPath).isDirectory()) {
            return getAllCommitsByBranches(currentPath);
        }

        const branch = new Branch(currentPath);
        const branchFile = branch.readFile();

        const commits = branchFile
            .split('\n')
            .filter((line) => line.includes('commit'))
            .map((line) => new Commit(line));

        return { branch, commits };
    });
}

function collectCommits(path) {
    return collectRepositories(path).map((repo) => ({ repo, commitsByBranches: getAllCommitsByBranches(repo) }));
}

module.exports = {
    collectRepositories,
    collectCommits
};
