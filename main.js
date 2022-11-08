const colors = require('colors');
const moment = require('moment');
const path = require('path');

const { collectCommits } = require('./collectors');

function displayLatestCommitsSince(since) {
    return ({ repo, commitsByBranches }) => {
        const repoName = path.basename(path.join(repo, '..', '..', '..', '..'));

        console.log(colors.cyan.underline(repoName));

        commitsByBranches.forEach(({ branch, commits }) => {
            const branchName = path.relative(repo, branch.fileLocation);

            const latestCommits = commits.filter((commit) => since.isBefore(commit.date));

            if (latestCommits.length > 0) {
                outputCommits(commits, branchName);
            }
        });
    };
}

function outputCommits(commitsToOutput, branchName) {
    console.log(`${colors.green(branchName)}`);

    commitsToOutput.forEach(printCommit);
}

function printCommit(commit) {
    const hoursSince = moment(commit.date).fromNow();
    const name = `<${commit.name}>`;

    console.log('-', commit.message, colors.green(`(${hoursSince})`), `${colors.cyan(name)}`);
}

function getLatestCommitDate(repoCommits) {
    const dates = repoCommits.flatMap(({ commitsByBranches }) =>
        commitsByBranches.flatMap(({ commits }) => commits.map((commit) => commit.date))
    );

    const latest = Math.max.apply(null, dates);

    return moment(latest).subtract(24, 'hours');
}

function displayLatestCommits({ from, since }) {
    const repoCommits = collectCommits(from);

    const date = since || getLatestCommitDate(repoCommits);

    repoCommits.forEach(displayLatestCommitsSince(date));
}

module.exports = { displayLatestCommits };
