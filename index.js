const fs = require('fs');

const currentFolder = fs.readdirSync(__dirname);
allDirs = currentFolder.filter(f => fs.lstatSync(f).isDirectory())
allDirs = getFoldersWithGitRepo(allDirs);

for (const dir of allDirs) {
    console.log(dir);
    //const dirContents = fs.readdirSync(`${__dirname}\\${dir}\\.git`);
    const HEAD = fs.readFileSync(`${__dirname}\\${dir}\\.git\\logs\\HEAD`, 'utf-8');
    const commits = getCommits(HEAD);
    outputCommits(commits);
}



function getFoldersWithGitRepo(allDirs) {
    return allDirs.filter(d => fs.readdirSync(`${__dirname}\\${d}`).includes('.git'));
}


function getCommits(HEAD) {
    const lines = HEAD.split('\n');
    return lines.filter(line => line.includes('commit'));
}

function outputCommits(commits) {
    for (let commit of commits) {
        const tokens = commit.split(' ');
        
        let output = '';
        output += getCommitTime(tokens[4])
        output += ' ' + tokens[2];
        output += getCommitMessage(tokens);

        console.log(output);
    }
}

function getCommitTime(timeSinceEpoch) {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(timeSinceEpoch);
    return d.toLocaleString();
}

function getCommitMessage(tokens) {
    let message = '';
    for (let i = 6; i < tokens.length; i++) {
        message += ' ' + tokens[i];
    }
    return message;
}