// /[^on]+\S+(?=(Click)\b)/
import forIn from '@antv/util/lib/for-in';
export var BASE_EVENT_NAMES = [
    'mousedown',
    'mouseup',
    'dblclick',
    'mouseenter',
    'mouseout',
    'mouseover',
    'mousemove',
    'mouseleave',
    'contextmenu',
    'click',
];
var EVENT_ACTION_NAMES = [
    'mousedown',
    'mouseup',
    'dblclick',
    'mouseenter',
    'mouseout',
    'mouseover',
    'mousemove',
    'mouseleave',
    'contextmenu',
    'click',
    'show',
    'hide',
    'change',
];
var RegExpEvent = new RegExp("^on(.*)(?=(".concat(EVENT_ACTION_NAMES.map(function (k) { return k.replace(/^\S/, function (s) { return s.toUpperCase(); }); }).join('|'), "))"));
export var pickEventName = function (props) {
    var names = [];
    forIn(props, function (v, k) {
        var event = k.match(/^on(.*)/);
        if (event) {
            var res = k.match(RegExpEvent);
            if (res) {
                var target = res[1].replace(/([A-Z])/g, "-$1").toLowerCase();
                target = target.replace('column', 'interval');
                if (target) {
                    names.push([k, "".concat(target.replace('-', ''), ":").concat(res[2].toLowerCase())]);
                }
                else {
                    names.push([k, res[2].toLowerCase()]);
                }
            }
            else {
                names.push([k, event[1].toLowerCase()]);
            }
        }
    });
    return names;
};
export var DRAG_EVENT_NAMES = [
    'dragstart',
    'drag',
    'dragend',
    'dragover',
    'dragenter',
    'dragleave',
    'drop'
];
export var MOBILE_EVENT_NAMES = [
    'touchstart',
    'touchmove',
    'touchend',
];
export var LIFE_CIRCLE_NAMES = [
    'beforerender',
    'afterrender',
    'beforepaint',
    'afterpaint',
    'beforechangedata',
    'afterchangedata',
    'beforeclear',
    'afterclear',
    'beforedestroy', // 销毁 View 或者 Chart 前触发
];
export var LEGEND_EVENT_TARGETS = [
    'legend',
    'legend-title',
    'legend-item',
    'legend-item-name',
    'legend-item-Maker',
    'legend-item-value', // 图例选项 value 的事件前缀
];
export var GEOM_NAME = [
    'line',
    'area',
    'point',
    'interval',
    'polygon',
    'edge',
    'schema'
];
export var LEGEND_EVENT = ['legend:valuechanged'];
export var AXIS_EVENT_TARGET = [
    'axis-label',
    'axis-line',
    'axis-tick',
    'axis-title', // 坐标轴标题事件前缀
];
export var ANNOTATION_EVENT_TARGET = [
    'annotation',
    'annotation-line',
    'annotation-line-text',
    'annotation-image',
    'annotation-region',
    'annotation-text', // 辅助文本的事件前缀
];
export var TOOLTIP_EVENT = [
    'tooltip:show',
    'tooltip:hide',
    'tooltip:change',
];
//# sourceMappingURL=events.js.map