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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.polyfillDescriptionEvent = exports.polyfillTitleEvent = exports.polyfillEvents = exports.polyfillOptions = exports.polyfillVisible = exports.polyfillAxis = exports.replaceApi = void 0;
var warning_1 = __importDefault(require("warning"));
var util_1 = require("@antv/util");
var sum_1 = __importDefault(require("../../utils/data-transform/sum"));
var events_1 = require("../../components/Chart/events");
// 批量替换api
var replaceApi = function (replaceApiList, options) {
    replaceApiList.forEach(function (item) {
        var sourceKey = item.sourceKey, targetKey = item.targetKey, notice = item.notice;
        var value = (0, util_1.get)(options, sourceKey);
        if (value) {
            (0, warning_1.default)(false, notice);
            (0, util_1.set)(options, targetKey, value);
        }
    });
};
exports.replaceApi = replaceApi;
/**
 * 将的sourceKey的配置作为targetKey的配置；
 * 例如：将angleAxis的作为xAxis的配置
 */
var polyfillAxis = function (cfg, name) {
    var options = (0, util_1.get)(cfg, name);
    if (options === false || options === null) {
        cfg[name] = null;
        return;
    }
    if (options === undefined) {
        return;
    }
    if (options === true) {
        cfg[name] = {};
        return;
    }
    if (!(0, util_1.isObject)(options)) {
        (0, warning_1.default)(true, "".concat(name, " \u914D\u7F6E\u53C2\u6570\u4E0D\u6B63\u786E"));
        return;
    }
    (0, exports.polyfillVisible)(options, 'line', null);
    (0, exports.polyfillVisible)(options, 'grid', null);
    (0, exports.polyfillVisible)(options, 'label', null);
    (0, exports.polyfillVisible)(options, 'tickLine', null);
    (0, exports.polyfillVisible)(options, 'title', null);
    var label = (0, util_1.get)(options, 'label');
    if (label) {
        if ((0, util_1.isObject)(label)) {
            var suffix_1 = label.suffix;
            if (suffix_1) {
                // 不是undefined null 或 suffix存在
                (0, util_1.set)(label, 'formatter', function (val) { return "".concat(val).concat(suffix_1); });
            }
            // @ts-ignore
            var offsetX = label.offsetX, offsetY = label.offsetY, offset = label.offset;
            if ((0, util_1.isNil)(offset) && (!(0, util_1.isNil)(offsetX) || !(0, util_1.isNil)(offsetY))) {
                if (name === 'xAxis') {
                    (0, util_1.set)(label, 'offset', !(0, util_1.isNil)(offsetX) ? offsetX : offsetY);
                }
                if (name === 'yAxis') {
                    (0, util_1.set)(label, 'offset', !(0, util_1.isNil)(offsetY) ? offsetY : offsetX);
                }
            }
        }
    }
    cfg[name] = __assign(__assign({}, options), { label: label });
};
exports.polyfillAxis = polyfillAxis;
// visible的使用转化
var polyfillVisible = function (polyfillOpt, path, negativeValue) {
    if (negativeValue === void 0) { negativeValue = false; }
    var vis = (0, util_1.get)(polyfillOpt, "".concat(path, ".visible"));
    if (vis === false || vis === null) {
        (0, util_1.set)(polyfillOpt, path, negativeValue);
    }
    return vis;
};
exports.polyfillVisible = polyfillVisible;
var polyfillOptions = function (opt) {
    var polyfillOpt = __assign({}, opt);
    // tooltip
    (0, exports.polyfillVisible)(polyfillOpt, 'tooltip');
    // legend
    var legendVis = (0, exports.polyfillVisible)(polyfillOpt, 'legend');
    if (legendVis) {
        (0, exports.polyfillVisible)(polyfillOpt, 'legend.title');
        var position = (0, util_1.get)(polyfillOpt, 'legend.position');
        if (position) {
            (0, util_1.set)(polyfillOpt, 'legend.position', {
                'top-center': 'top',
                'right-center': 'right',
                'left-center': 'left',
                'bottom-center': 'bottom',
            }[position] || position);
        }
    }
    var formatter = (0, util_1.get)(polyfillOpt, 'legend.formatter');
    if (formatter) {
        var itemName = (0, util_1.get)(polyfillOpt, 'legend.itemName', {});
        (0, util_1.set)(polyfillOpt, 'legend.itemName', __assign(__assign({}, itemName), { formatter: formatter }));
    }
    var textConfig = (0, util_1.get)(polyfillOpt, 'legend.text');
    if (textConfig) {
        (0, util_1.set)(polyfillOpt, 'legend.itemName', textConfig);
    }
    // label
    (0, exports.polyfillVisible)(polyfillOpt, 'label');
    // axis
    (0, exports.polyfillAxis)(polyfillOpt, 'xAxis');
    (0, exports.polyfillAxis)(polyfillOpt, 'yAxis');
    // 辅助线
    var guideLine = (0, util_1.get)(polyfillOpt, 'guideLine', []);
    var data = (0, util_1.get)(polyfillOpt, 'data', []);
    var yField = (0, util_1.get)(polyfillOpt, 'yField', 'y');
    guideLine.forEach(function (element) {
        if (data.length > 0) {
            var y = 'median';
            switch (element.type) {
                case 'max':
                    y = (0, util_1.maxBy)(data, function (d) { return d[yField]; })[yField];
                    break;
                case 'mean':
                    y = (0, sum_1.default)(data.map(function (d) { return d[yField]; })) / data.length;
                    break;
                default:
                    // min
                    y = (0, util_1.minBy)(data, function (d) { return d[yField]; })[yField];
                    break;
            }
            var line = __assign(__assign({ start: ['min', y], end: ['max', y], style: element.lineStyle, text: { content: y } }, element), { type: 'line' });
            if (!(0, util_1.get)(polyfillOpt, 'annotations')) {
                (0, util_1.set)(polyfillOpt, 'annotations', []);
            }
            polyfillOpt.annotations.push(line);
            (0, util_1.set)(polyfillOpt, 'point', false);
        }
    });
    // slider
    var interactions = (0, util_1.get)(polyfillOpt, 'interactions', []);
    var slider = interactions.find(function (it) { return it.type === 'slider'; });
    if (slider && (0, util_1.isNil)(polyfillOpt.slider)) {
        polyfillOpt.slider = slider.cfg;
    }
    return polyfillOpt;
};
exports.polyfillOptions = polyfillOptions;
var polyfillEvents = function (chart, preOptions, newOptions) {
    // 事件兼容
    var eventNames = (0, events_1.pickEventName)((0, util_1.get)(preOptions, 'events', []));
    var newEventNames = (0, events_1.pickEventName)((0, util_1.get)(newOptions, 'events', []));
    // 取消事件绑定
    eventNames.forEach(function (ev) {
        chart.off(ev[1], preOptions.events[ev[0]]);
    });
    // 重新事件绑定
    newEventNames.forEach(function (ev) {
        chart.on(ev[1], newOptions.events[ev[0]]);
    });
};
exports.polyfillEvents = polyfillEvents;
var polyfillTitleEvent = function (options) {
    var events = (0, util_1.get)(options, 'events', {});
    var titleEvents = {};
    [
        'onTitleClick',
        'onTitleDblClick',
        'onTitleMouseleave',
        'onTitleMousemove',
        'onTitleMousedown',
        'onTitleMouseup',
        'onTitleMouseenter',
    ].forEach(function (e) {
        if (events[e]) {
            titleEvents[e.replace('Title', '')] = events[e];
        }
    });
    return titleEvents;
};
exports.polyfillTitleEvent = polyfillTitleEvent;
var polyfillDescriptionEvent = function (options) {
    var events = (0, util_1.get)(options, 'events', {});
    var titleEvents = {};
    [
        'onDescriptionClick',
        'onDescriptionDblClick',
        'onDescriptionMouseleave',
        'onDescriptionMousemove',
        'onDescriptionMousedown',
        'onDescriptionMouseup',
        'onDescriptionMouseenter',
    ].forEach(function (e) {
        if (events[e]) {
            titleEvents[e.replace('Description', '')] = events[e];
        }
    });
    return titleEvents;
};
exports.polyfillDescriptionEvent = polyfillDescriptionEvent;
//# sourceMappingURL=polyfill.js.map