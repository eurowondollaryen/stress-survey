const nullToZero = (val) => {
    if(val === null || val === undefined) return 0;
    return val;
};

exports.nullToZero = nullToZero;