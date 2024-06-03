"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.antvDark = exports.antvLight = exports.createThemeByStyleSheet = void 0;
// 注册主题
var dark_1 = require("@antv/g2/lib/theme/style-sheet/dark");
Object.defineProperty(exports, "antvDark", { enumerable: true, get: function () { return dark_1.antvDark; } });
var light_1 = require("@antv/g2/lib/theme/style-sheet/light");
Object.defineProperty(exports, "antvLight", { enumerable: true, get: function () { return light_1.antvLight; } });
var create_by_style_sheet_1 = require("@antv/g2/lib/theme/util/create-by-style-sheet");
Object.defineProperty(exports, "createThemeByStyleSheet", { enumerable: true, get: function () { return create_by_style_sheet_1.createThemeByStyleSheet; } });
var theme_1 = require("@antv/g2/lib/theme");
(0, theme_1.registerTheme)('dark', (0, create_by_style_sheet_1.createThemeByStyleSheet)(dark_1.antvDark));
(0, theme_1.registerTheme)('default', (0, create_by_style_sheet_1.createThemeByStyleSheet)(light_1.antvLight));
(0, theme_1.registerTheme)('light', (0, create_by_style_sheet_1.createThemeByStyleSheet)(light_1.antvLight));
//# sourceMappingURL=index.js.map