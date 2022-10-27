const moment = require('moment');

const date = (input) => {
    const matches = input.match(/(\d+) (\w+)( ago)?/);
    if (matches) {
        const unit = moment.normalizeUnits(matches[2]);

        if (!unit) {
            throw new Error('Could not parse date');
        }

        return moment().subtract(matches[1], matches[2]);
    }

    return moment(input);
};

module.exports = date;
