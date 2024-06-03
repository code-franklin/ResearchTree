export default (function (num, decimal) {
    if (decimal === void 0) { decimal = 2; }
    var wan = 10000;
    var yi = 100000000;
    if (num >= yi) {
        return "".concat((num / yi).toFixed(decimal).replace(/\.?0*$/, ''), "\u4EBF");
    }
    if (num >= wan) {
        return "".concat((num / wan).toFixed(decimal).replace(/\.?0*$/, ''), "\u4E07");
    }
    return num.toFixed(decimal).replace(/\.?0*$/, '');
});
//# sourceMappingURL=minifyNum.js.map