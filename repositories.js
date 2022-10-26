const fs = require('fs');
const path = require('path');

function isDirectory(path) {
    try {
        return fs.lstatSync(path).isDirectory();
    } catch {
        return false;
    }
}

function getRepositories(dir) {
    const entries = fs.readdirSync(dir).map((entry) => path.join(dir, entry));

    const directories = entries.filter(isDirectory);

    if (directories.length == 0) {
        throw new Error('There are no folders in this directory');
    }

    const repositories = directories
        .map((dir) => path.join(dir, '.git', 'logs', 'refs', 'heads'))
        .filter(isDirectory);

    if (repositories.length === 0) {
        throw new Error('There are no repositories in any of the folders in this directory');
    }

    return repositories;
}

module.exports = getRepositories;
