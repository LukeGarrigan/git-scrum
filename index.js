const fs = require('fs');
const moment = require('moment');
const Commit = require('./commit');
const currentFolder = fs.readdirSync(__dirname);
allDirs = currentFolder.filter(f => fs.lstatSync(f).isDirectory())
allDirs = getFoldersWithGitRepo(allDirs);

for (const dir of allDirs) {
    console.log(dir);
    const HEAD = fs.readFileSync(`${__dirname}\\${dir}\\.git\\logs\\HEAD`, 'utf-8');
    const commits = getLatestCommits(HEAD);
    outputCommits(commits);
}

function getFoldersWithGitRepo(allDirs) {
    return allDirs.filter(d => fs.readdirSync(`${__dirname}\\${d}`).includes('.git'));
}

function getLatestCommits(HEAD) {
    let lines = HEAD.split('\n');
    lines = lines.filter(line => line.includes('commit'));

    let latestCommits = [];
    for (let line of lines) {
        let commit = new Commit(line);
        if (moment().diff(commit.date, 'hours') < 24) {
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