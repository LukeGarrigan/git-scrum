const Commit = require('../commit');


// 0000000000000000000000000000000000000000 c55d1fc568ce0e61c117dee9bf9872ec55238810 Luke Garrigan <lukegarrigan8@gmail.com> 1601545302 +0100	branch: Created from master
// c55d1fc568ce0e61c117dee9bf9872ec55238810 c81b06bf681dfb6c76110e3245b8ed4fb5439e3d Luke Garrigan <lukegarrigan8@gmail.com> 1601545523 +0100	commit: Fixed issue where intent labels don't have colour

describe('when a standard commit provided', () => {
    const standardCommit = "d1fc568ce0e61c117dee9bf9872ec55238810 c81b06bf681dfb6c76110e3245b8ed4fb5439e3d Luke Garrigan <lukegarrigan8@gmail.com> 1601545523 +0100	commit: Fixed issue where intent labels don't have colour";

    test('should extract date from string', () => {
        const commit = new Commit(standardCommit, "master")
        let d = new Date(0);
        d.setUTCSeconds(1601545523);
        expect(commit.date.toLocaleDateString()).toBe(d.toLocaleDateString());
    });

    test('should extract name from string', () => {
        const commit = new Commit(standardCommit, "master")
        expect(commit.name).toBe("Luke Garrigan");
    });

    test('should extract commit message', () => {
        const commit = new Commit(standardCommit, "master")
        expect(commit.message).toBe("Fixed issue where intent labels don't have colour");
    });
})


describe('When just one name', () => {
    const justOneNameCommit = "d1fc568ce0e61c117dee9bf9872ec55238810 c81b06bf681dfb6c76110e3245b8ed4fb5439e3d Luke <lukegarrigan8@gmail.com> 1601545523 +0100	commit: Fixed issue where intent labels don't have colour";

    test('should extract just one name', () => {
        const commit = new Commit(justOneNameCommit, "master")
        expect(commit.name).toBe("Luke");
    });

    test('should extract date', () => {
        const commit = new Commit(justOneNameCommit, "master")
        let d = new Date(0);
        d.setUTCSeconds(1601545523);
        expect(commit.date.toLocaleDateString()).toBe(d.toLocaleDateString());
    });

    test('should extract commit message', () => {
        const commit = new Commit(justOneNameCommit, "master")
        expect(commit.message).toBe("Fixed issue where intent labels don't have colour");
    });
})



describe('When three names provided', () => {
    const justOneNameCommit = "d1fc568ce0e61c117dee9bf9872ec55238810 c81b06bf681dfb6c76110e3245b8ed4fb5439e3d Luke Michael Garrigan <lukegarrigan8@gmail.com> 1601545523 +0100	commit: Fixed issue where intent labels don't have colour";

    test('should extract just one name', () => {
        const commit = new Commit(justOneNameCommit, "master")
        expect(commit.name).toBe("Luke Michael Garrigan");
    });

    test('should extract date', () => {
        const commit = new Commit(justOneNameCommit, "master")
        let d = new Date(0);
        d.setUTCSeconds(1601545523);
        expect(commit.date.toLocaleDateString()).toBe(d.toLocaleDateString());
    });

    test('should extract commit message', () => {
        const commit = new Commit(justOneNameCommit, "master")
        expect(commit.message).toBe("Fixed issue where intent labels don't have colour");
    });
})
