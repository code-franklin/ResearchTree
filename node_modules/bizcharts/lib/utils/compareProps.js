"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 对比不一致则执行回调
*/
var each_1 = __importDefault(require("@antv/util/lib/each"));
var is_array_1 = __importDefault(require("@antv/util/lib/is-array"));
var shallowEqual_1 = __importDefault(require("./shallowEqual"));
exports.default = (function (preProps, nextProps, keys, callback) {
    // preProps 为null 即初始化。
    if (preProps === null) {
        (0, each_1.default)(keys, function (key) {
            var value = nextProps[key];
            if (value !== undefined) {
                if (!(0, is_array_1.default)(value)) {
                    value = [value];
                }
                callback(value, key);
            }
        });
        return;
    }
    var value;
    var nextValue;
    (0, each_1.default)(keys, function (key) {
        value = preProps[key];
        nextValue = nextProps[key];
        if (!(0, shallowEqual_1.default)(nextValue, value)) {
            if (!(0, is_array_1.default)(nextValue)) {
                nextValue = [nextValue];
            }
            callback(nextValue, key);
        }
    });
});
//# sourceMappingURL=compareProps.js.map