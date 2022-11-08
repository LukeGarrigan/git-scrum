module.exports = class Commit {
    constructor({ date, name, message }) {

        this.date = date;
        this.name = name;
        this.message = message;
    }

    static fromCommitLine(line) {
        const [header, entry] = line.split('\t');
        const headers = header.split(' ');

        const date = new Date(0);
        date.setUTCSeconds(headers.slice(-2, -1));

        if (date instanceof Date && isFinite(date)) {
            const name = headers.slice(2, -3).join(' ');
            const message = entry.split(' ').slice(1).join(' ');

            return new Commit({ date, name, message });
        }

        throw new Error('Could not parse commit message. Date is invalid.');
    }
}
