const moment = require('moment');
const colors = require('colors');
module.exports = class Commit {

    constructor(commitLine, branchName) {
        const tokens = commitLine.split(' ');
        this.name = tokens[2];
        this.date = this.getCommitDate(tokens);
        this.message = this.getCommitMessage(tokens);
        this.timeSince = this.getTimeSince();
        this.branchName = branchName;
    }

    getCommitMessage(tokens) {
        let message = '';
        for (let i = 6; i < tokens.length; i++) {
            message += ' ' + tokens[i];
        }
        return message;
    }

    getCommitDate(tokens) {
        for (let i = 4; i < 7; i++) { // can have multiple names
            let d = new Date(0); 
            d.setUTCSeconds(tokens[i]);
            if (d instanceof Date && isFinite(d)) {
                return d;
            }
        }
    }

    getTimeSince() {
        const now = moment(new Date());
        const end = moment(this.date);
        const duration = now.diff(end, 'hours');
        let output = `${duration} hours ago`;
        return output;
    }

    print() {
        console.log(colors.green(this.timeSince), this.message, `- ${colors.blue(this.branchName)}`,`${colors.cyan("<" +this.name+ ">")}`);
    }
}
