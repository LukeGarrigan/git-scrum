#!/usr/bin/env node

const { Command, Option } = require('commander');
const process = require('process');
const { displayLatestCommits } = require('./main');

const version = require('./package.json').version;

const date = require('./date');

const sinceOption = (option) => {
    return new Option(`--${option} <date>`, 'Show work after a specific date').argParser(date);
};

const program = new Command();

program
    .name('git-scrum')
    .version(version)
    .addOption(sinceOption('since'))
    .addOption(sinceOption('after'))
    .parse();

const { since } = program.opts();

try {
    displayLatestCommits({
        from: process.cwd(),
        since: since
    });
} catch (e) {
    console.log(e);
    process.exit(1);
}
