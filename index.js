#!/usr/bin/env node
const fs = require('fs');
const moment = require('moment');
const Commit = require('./commit');
const Branch = require('./branch');
const colors = require('colors');

const CWD = process.cwd();
const currentFolder = fs.readdirSync(CWD);

allDirs = currentFolder.filter(f => fs.lstatSync(`${CWD}\\${f}`).isDirectory());

if (allDirs.length == 0) {
    console.log(colors.red('There are no folders in this directory'));
    return;
}

allDirs = getFoldersWithGitRepo(allDirs);
if (allDirs.length == 0) {
    console.log(colors.red('There are no repositories in any of the folders in this directory'));
    return;
}

let hoursSinceLastWorked = Infinity;
for (const dir of allDirs) {
    console.log(colors.trap('-------------------------------------------------------------------------------------------------'));
    console.log(colors.cyan(dir));
    const branches = fs.readdirSync(`${CWD}\\${dir}\\.git\\logs\\refs\\heads`);

    for (let branchName of branches) {

        const branch = new Branch(`${CWD}\\${dir}\\.git\\logs\\refs\\heads\\${branchName}`);
        if (branch.timeSinceWorkedOn < hoursSinceLastWorked) {
            hoursSinceLastWorked = branch.timeSinceWorkedOn;
        }
        const commits = getLatestCommits(branch.readFile(), branchName);
        outputCommits(commits);
    }
}

function getFoldersWithGitRepo(allDirs) {
    return allDirs.filter(d => fs.readdirSync(`${CWD}\\${d}`).includes('.git'));
}

function getLatestCommits(branchFile, branchName) {
    let lines = branchFile.split('\n');
    lines = lines.filter(line => line.includes('commit'));

    let latestCommits = [];
    for (let line of lines) {
        let commit = new Commit(line, branchName);
        if (moment().diff(commit.date, 'hours') < (hoursSinceLastWorked + 23)) {
            latestCommits.push(commit);
        }
    }
    return latestCommits;
}

function outputCommits(commits) {
    for (let commit of commits) {
        commit.print();
    }
}