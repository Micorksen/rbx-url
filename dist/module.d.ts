/******************************************************
 * Copyright (c) 2022 Micorksen.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 ******************************************************/
export declare class RbxURL {
    static ROBLOX_SUCCESS: number;
    static ROBLOX_CANNOT_GET_TICKET: number;
    static ROBLOX_CANNOT_OPEN: number;
    static ROBLOX_CANNOT_LOGIN_IN: number;
    private static debugging;
    private static debug;
    /** Enable or disable debugging. */
    static enableOrDisableDebugging(): void;
    /**
     * Create new instance of RbxURL.
     * @argument robloxSecurityToken You can get it on your cookies, the name is : .ROBLOSECURITY
     * @argument placeLauncher Informations about the « place », the mini-game.
    **/
    static new(robloxSecurityToken: string, placeLauncher: {
        placeId: string | number;
        browserTrackerId: string | number;
        locale: string;
    }): Promise<{
        status: number;
        url?: string;
    }>;
    static openRobloxPlayer(url: string): Promise<{
        status: number;
    } | undefined>;
}
