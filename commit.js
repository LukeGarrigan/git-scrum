const moment = require('moment');
const colors = require('colors');
module.exports = class Commit {

    constructor(commitLine, branchName) {
        const tokens = commitLine.split(' ');
        this.name = tokens[2];
        this.message = this.getCommitMessage(tokens);
        this.date = this.getCommitDate(tokens[4]);
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

    getCommitDate(timeSinceEpoch) {
        let d = new Date(0); 
        d.setUTCSeconds(timeSinceEpoch);
        return d;
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
