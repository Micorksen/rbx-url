"use strict";
/******************************************************
 * Copyright (c) 2022 Micorksen.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 ******************************************************/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbxURL = void 0;
// Dependencies.
const roblox = __importStar(require("noblox.js"));
const axios_1 = __importDefault(require("axios"));
const open_1 = __importDefault(require("open"));
class RbxURL {
    // Errors.
    static ROBLOX_SUCCESS = 0;
    static ROBLOX_CANNOT_GET_TICKET = 1;
    static ROBLOX_CANNOT_OPEN = 2;
    static ROBLOX_CANNOT_LOGIN_IN = 3;
    // Debug functions.
    static debugging = false;
    static debug(...data) { if (this.debugging)
        console.log(`\n      [rbxURL] ${data}`); }
    ;
    static enableOrDisableDebugging() { this.debugging = !this.debugging; }
    // Constructor.
    static async new(robloxSecurityToken, placeLauncher) {
        let user, csrfToken, authTicketRequest;
        // Step 1 : Login into the user account.
        try {
            user = await roblox.setCookie(robloxSecurityToken),
                csrfToken = await roblox.getGeneralToken();
            this.debug(`Logged in as ${user.UserName}.`);
        }
        catch (exception) {
            this.debug(`Cannot login.`);
            return { status: this.ROBLOX_CANNOT_LOGIN_IN };
        }
        // Step 2 : Get authentification ticket.
        try {
            authTicketRequest = await axios_1.default.post("https://auth.roblox.com/v1/authentication-ticket", {}, {
                headers: {
                    Cookie: `.ROBLOSECURITY=${robloxSecurityToken}`,
                    "X-Csrf-Token": csrfToken,
                    Referer: "https://www.roblox.com/"
                }
            });
            this.debug(`Received authentification ticket.`);
        }
        catch (exception) {
            this.debug(`No authentification ticket received.`);
            return { status: this.ROBLOX_CANNOT_GET_TICKET };
        }
        // Step 3 : Generate URL.
        const url = [
            "roblox-player:1",
            "+launchmode:play",
            `+gameinfo:${authTicketRequest.headers["rbx-authentication-ticket"]}`,
            `+launchtime:${Date.now()}`,
            `+placelauncherurl:${(`https://assetgame.roblox.com/game/PlaceLauncher.ashx?request=RequestGame&browserTrackerId=${placeLauncher.browserTrackerId}&placeId=${placeLauncher.placeId}&isPlayTogetherGame=false`)}`,
            `+browsertrackerid:${placeLauncher.browserTrackerId}`,
            `+robloxLocale:${placeLauncher.locale}`,
            `+gameLocale:${placeLauncher.locale}`,
            "+channel:"
        ].join("");
        this.debug(`Generated URL.`);
        return {
            status: this.ROBLOX_SUCCESS,
            url: url
        };
    }
    ;
    static async openRobloxPlayer(url) {
        try {
            await (0, open_1.default)(url);
            this.debug("Roblox Player is opened !");
        }
        catch (exception) {
            this.debug(`
            Cannot open Roblox Player.
            Paste this URL into your browser and click "Open Roblox" : ${url}
            `);
            return { status: this.ROBLOX_CANNOT_OPEN };
        }
    }
    ;
}
exports.RbxURL = RbxURL;
;
