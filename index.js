#!/usr/bin/env node

const colors = require('colors');
const path = require('path');
const process = require('process');
const moment = require('moment');

const { collectCommits } = require('./collectors');

try {
    const repoCommits = collectCommits(process.cwd());

    const latestCommit = getLatestCommit(repoCommits);
    const since = moment(latestCommit).subtract(24, 'hours');

    repoCommits.forEach(displayLatestCommitsSince(since));
} catch (e) {
    console.log(e);
    process.exit(1);
}

function getLatestCommit(repoCommits) {
    const dates = repoCommits.flatMap(({ commitsByBranches }) =>
        commitsByBranches.flatMap(({ commits }) => commits.map((commit) => commit.date))
    );

    return Math.max.apply(null, dates);
}

function displayLatestCommitsSince(since) {
    return ({ repo, commitsByBranches }) => {
        const repoName = path.basename(path.join(repo, '..', '..', '..', '..'));

        console.log(colors.cyan.underline(repoName));

        commitsByBranches.forEach(({ branch, commits }) => {
            const branchName = path.relative(repo, branch.fileLocation);

            const latestCommits = commits.filter((commit) => since.isBefore(commit.date));

            if (latestCommits && latestCommits.length > 0) {
                outputCommits(commits, branchName);
            }
        });
    };
}

function outputCommits(commitsToOutput, branchName) {
    console.log(`${colors.green(branchName)}`);
    for (let commit of commitsToOutput) {
        commit.print();
    }
}
