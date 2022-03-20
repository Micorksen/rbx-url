/******************************************************
 * Copyright (c) 2022 Micorksen.
 * 
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * 
 ******************************************************/

// Dependencies.
import * as roblox from "noblox.js";
import axios, { AxiosResponse } from "axios";
import open from "open";

export class RbxURL{
    // Errors.
    public static ROBLOX_SUCCESS: number = 0;
    public static ROBLOX_CANNOT_GET_TICKET: number = 1;
    public static ROBLOX_CANNOT_OPEN: number = 2;
    public static ROBLOX_CANNOT_LOGIN_IN: number = 3;

    // Debug functions.
    private static debugging: boolean = false;
    private static debug(...data: any[]): void{ if(this.debugging) console.log(`\n      [rbxURL] ${data}`); };
    public static enableOrDisableDebugging(): void{ this.debugging = !this.debugging; }

    // Constructor.
    public static async new(robloxSecurityToken: string, placeLauncher: {
        placeId: string | number
        browserTrackerId: string | number,
        locale: string
    }): Promise<{
        status: number,
        url?: string
    }>{
        let user: roblox.LoggedInUserData,
            csrfToken: string,
            authTicketRequest: AxiosResponse<any, any>;

        // Step 1 : Login into the user account.
        try{
            user = await roblox.setCookie(robloxSecurityToken),
                csrfToken = await roblox.getGeneralToken();

            this.debug(`Logged in as ${user.UserName}.`);
        } catch(exception){
            this.debug(`Cannot login.`);
            return { status: this.ROBLOX_CANNOT_LOGIN_IN };
        }

        // Step 2 : Get authentification ticket.
        try{
            authTicketRequest = await axios.post("https://auth.roblox.com/v1/authentication-ticket", {}, {
                headers: {
                    Cookie: `.ROBLOSECURITY=${robloxSecurityToken}`,
                    "X-Csrf-Token": csrfToken,
                    Referer: "https://www.roblox.com/"
                }
            });

            this.debug(`Received authentification ticket.`);
        } catch(exception){
            this.debug(`No authentification ticket received.`);
            return { status: this.ROBLOX_CANNOT_GET_TICKET };
        }

        // Step 3 : Generate URL.
        const url: string = [
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
    };

    public static async openRobloxPlayer(url: string){
        try{
            await open(url);
            this.debug("Roblox Player is opened !");
        } catch(exception){
            this.debug(`
            Cannot open Roblox Player.
            Paste this URL into your browser and click "Open Roblox" : ${url}
            `);
            
            return { status: this.ROBLOX_CANNOT_OPEN };
        }
    };
};