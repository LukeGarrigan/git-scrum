#!/usr/bin/env node

const colors = require('colors');
const process = require('process');

const { displayLatestCommits } = require('./main');

try {
    displayLatestCommits({
        from: process.cwd(),
        since: null
    });
} catch (e) {
    console.log(e);
    process.exit(1);
}
