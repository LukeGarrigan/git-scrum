#!/usr/bin/env node
const fs = require('fs');
const colors = require('colors');
const path = require('path');
const process = require('process');

const Commit = require('./commit');
const Branch = require('./branch');
const repositories = require('./repositories');

let repos;

try {
    repos = repositories(process.cwd());
} catch (e) {
    console.log(colors.red('There are no folders in this directory'));
    process.exit(1);
}

let hoursSinceLastWorked = Infinity;

repos.forEach(findTimeSinceLastCommit);

repos.forEach((repo) => {
    const dir = path.basename(path.join(repo, '..', '..', '..', '..'));
    console.log(colors.cyan.underline(dir));
    findAllCommitsInBranches(repo);
});

function findTimeSinceLastCommit(directoryPath) {
    const branches = fs.readdirSync(directoryPath);
    for (let branchName of branches) {
        const currentPath = `${directoryPath}/${branchName}`;
        if (fs.lstatSync(currentPath).isDirectory()) {
            findTimeSinceLastCommit(currentPath);
        } else {
            const branch = new Branch(currentPath);
            const branchFile = branch.readFile();
            let lines = branchFile.split('\n');
            lines = lines.filter((line) => line.includes('commit'));

            for (let line of lines) {
                let commit = new Commit(line, branchName);
                if (commit.hoursSince < hoursSinceLastWorked) {
                    hoursSinceLastWorked = commit.hoursSince;
                }
            }
        }
    }
}

function findAllCommitsInBranches(directoryPath) {
    const branches = fs.readdirSync(directoryPath);
    for (let branchName of branches) {
        const currentPath = `${directoryPath}/${branchName}`;
        if (fs.lstatSync(currentPath).isDirectory()) {
            findAllCommitsInBranches(currentPath);
        } else {
            const branch = new Branch(currentPath);
            const commits = getLatestCommits(branch.readFile(), branchName);

            if (commits && commits.length > 0) {
                outputCommits(commits, branchName);
            }
        }
    }
}

function getLatestCommits(branchFile, branchName) {
    let lines = branchFile.split('\n');
    lines = lines.filter((line) => line.includes('commit'));

    let latestCommits = [];
    for (let line of lines) {
        let commit = new Commit(line, branchName);
        if (commit.hoursSince < hoursSinceLastWorked + 24) {
            latestCommits.push(commit);
        }
    }
    return latestCommits;
}

function outputCommits(commitsToOutput, branchName) {
    console.log(`${colors.green(branchName)}`);
    for (let commit of commitsToOutput) {
        commit.print();
    }
}
