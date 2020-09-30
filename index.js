const fs = require('fs');
const moment = require('moment');
const Commit = require('./commit');
const currentFolder = fs.readdirSync(__dirname);
allDirs = currentFolder.filter(f => fs.lstatSync(f).isDirectory())
allDirs = getFoldersWithGitRepo(allDirs);

for (const dir of allDirs) {
    console.log('Project', dir);
    const branches = fs.readdirSync(`${__dirname}\\${dir}\\.git\\logs\\refs\\heads`);

    for (let branchName of branches) {
        const branchFile = fs.readFileSync(`${__dirname}\\${dir}\\.git\\logs\\refs\\heads\\${branchName}`, 'utf-8');
        const commits = getLatestCommits(branchFile, branchName);
        outputCommits(commits);
    }
    
}

function getFoldersWithGitRepo(allDirs) {
    return allDirs.filter(d => fs.readdirSync(`${__dirname}\\${d}`).includes('.git'));
}

function getLatestCommits(branchFile, branchName) {
    let lines = branchFile.split('\n');
    lines = lines.filter(line => line.includes('commit'));

    let latestCommits = [];
    for (let line of lines) {
        let commit = new Commit(line, branchName);
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