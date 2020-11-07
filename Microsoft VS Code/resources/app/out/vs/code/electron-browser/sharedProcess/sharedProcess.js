/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";const bootstrapWindow=(()=>window.MonacoBootstrapWindow)(),bootstrap=(()=>window.MonacoBootstrap)();bootstrap.avoidMonkeyPatchFromAppInsights(),bootstrapWindow.load(["vs/code/electron-browser/sharedProcess/sharedProcessMain"],(function(o,t){o.startup({machineId:t.machineId,windowId:t.windowId})}));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/3dd905126b34dcd4de81fa624eb3a8cbe7485f13/core/vs/code/electron-browser/sharedProcess/sharedProcess.js.map
