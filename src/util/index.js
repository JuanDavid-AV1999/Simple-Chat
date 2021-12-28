const { sep } = require('path');

const getBaseDir = (dir) => {
    const baseDir = dir.split(sep);
    baseDir.pop();
    return baseDir.join(sep);
}

module.exports = {
    getBaseDir
}