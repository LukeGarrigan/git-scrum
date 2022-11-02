const fs = require('fs');
const moment = require('moment');

module.exports = class Branch {
    constructor(fileLocation) {
        this.fileLocation = fileLocation;
        this.timeSinceWorkedOn = this.calcTimeSinceWorkedOn();
    }

    calcTimeSinceWorkedOn() {
        const fileStats = fs.statSync(this.fileLocation);
        return moment().diff(fileStats.mtimeMs, 'hours') 
    }
 
    readFile() {
        return fs.readFileSync(this.fileLocation, 'utf-8');
    }
}
