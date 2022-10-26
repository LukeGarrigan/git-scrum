const moment = require('moment');
const colors = require('colors');

module.exports = class Commit {
    constructor(commitLine, branchName) {
        this.tokens = commitLine.split(' ');
        this.date = this.extactCommitDate();
        this.name = this.extractName();
        this.message = this.extractCommitMessage();
        this.timeSince = this.calculateTimeSince();
        this.branchName = branchName;
    }

    extractCommitMessage() {
        let message = '';
        for (let i = this.indexOfDate + 2; i < this.tokens.length; i++) {
            message += ' ' + this.tokens[i];
        }
        return message.trim();
    }

    extactCommitDate() {
        for (let i = 4; i < 7; i++) { // can have multiple names
            let d = new Date(0);
            d.setUTCSeconds(this.tokens[i]);
            if (d instanceof Date && isFinite(d)) {
                this.indexOfDate = i;
                return d;
            }
        }
    }

    extractName() {
        let name = '';
        for (let i = 2; i < this.indexOfDate - 1; i++) {
            name += this.tokens[i] + ' ';
        }
        return name.trim();
    }

    calculateTimeSince() {
        const now = moment(new Date());
        const end = moment(this.date);
        this.hoursSince = now.diff(end, 'hours');
        return moment(this.date).fromNow();
    }

    print() {
        console.log('-', this.message, colors.green(`(${this.timeSince})`),`${colors.cyan("<" +this.name+ ">")}`);
    }
}
