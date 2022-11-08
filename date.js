const moment = require('moment');

const parseAmount = (amount) =>
    amount.startsWith('a') ? 1 : parseInt(amount, 10);

const date = (input) => {
    const matches = input.match(/(\d+|an?) (\w+)( ago)?/);
    if (matches) {
        const unit = moment.normalizeUnits(matches[2]);

        if (!unit) {
            throw new Error('Could not parse date');
        }

        const amount = parseAmount(matches[1]);

        return moment().subtract(amount, matches[2]);
    }

    return moment(input);
};

module.exports = date;
