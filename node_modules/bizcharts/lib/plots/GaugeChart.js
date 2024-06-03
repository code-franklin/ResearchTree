"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("react");
var gauge_1 = require("@antv/g2plot/lib/plots/gauge");
var createPlot_1 = __importDefault(require("../createPlot"));
var polyfill_1 = require("./core/polyfill");
var util_1 = require("@antv/util");
var warning_1 = __importDefault(require("warning"));
var g2_1 = require("@antv/g2");
// 该plot 无法完全兼容
exports.default = (0, createPlot_1.default)(gauge_1.Gauge, 'GaugeChart', function (opt) {
    var _a = (0, polyfill_1.polyfillOptions)(opt), range = _a.range, _b = _a.min, min = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 1 : _c, value = _a.value, options = __rest(_a, ["range", "min", "max", "value"]);
    if ((0, util_1.isArray)(range)) {
        (0, warning_1.default)(false, 'range 应当是个对象，请修改配置。');
        options.range = {
            ticks: range.map(function (t) { return (t - min) / (max - min); }),
            color: (0, g2_1.getTheme)().colors10,
        };
    }
    else {
        options.range = range || {};
    }
    var color = (0, util_1.get)(options, 'color');
    if (!(0, util_1.isNil)(color)) {
        (0, warning_1.default)(false, '请通过配置属性range.color来配置颜色');
        options.range.color = color;
    }
    if ((0, util_1.isNil)((0, util_1.get)(options, 'indicator'))) {
        // 默认灰色 indicator
        (0, util_1.set)(options, 'indicator', {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        });
    }
    if ((0, util_1.get)(options, 'statistic.visible')) {
        // 默认使用visible即使用旧版语法的人
        (0, util_1.set)(options, 'statistic.title', (0, util_1.get)(options, 'statistic'));
    }
    if (!(0, util_1.isNil)(min) && !(0, util_1.isNil)(max) && !(0, util_1.isNil)(value)) {
        // 旧版数据使用方式
        options.percent = (value - min) / (max - min);
        var formatter_1 = (0, util_1.get)(options, 'axis.label.formatter');
        (0, util_1.set)(options, 'axis', {
            label: {
                formatter: function (v) {
                    var val = v * (max - min) + min;
                    if ((0, util_1.isFunction)(formatter_1)) {
                        return formatter_1(val);
                    }
                    return val;
                },
            },
        });
    }
    (0, warning_1.default)(!((0, util_1.get)(options, 'min') || (0, util_1.get)(options, 'max')), '属性 `max` 和 `min` 不推荐使用， 请直接配置属性range.ticks');
    (0, warning_1.default)(!((0, util_1.get)(options, 'rangeSize') || (0, util_1.get)(options, 'rangeStyle') || 'rangeBackgroundStyle'), '不再支持rangeSize、rangeStyle、rangeBackgroundStyle属性, 请查看新版仪表盘配置文档。');
    // value 转为data，用于placeholder统一判断
    var data = !(0, util_1.isNil)(options.percent) ? options.percent : value;
    return __assign({ data: data }, options);
});
//# sourceMappingURL=GaugeChart.js.map