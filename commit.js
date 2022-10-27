module.exports = class Commit {
    constructor(commitLine) {
        this.tokens = commitLine.split(' ');
        this.date = this.extactCommitDate();
        this.name = this.extractName();
        this.message = this.extractCommitMessage();
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
}
