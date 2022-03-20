/******************************************************
 * Copyright (c) 2022 Micorksen.
 * 
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * 
 ******************************************************/

import { RbxURL } from "./module";

(async() =>{
    //RbxURL.enableOrDisableDebugging();
    const response = await RbxURL.new("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|", {
        placeId: "4924922222",
        browserTrackerId: "125716554770",
        locale: "fr_fr"
    });

    if(response.status === RbxURL.ROBLOX_SUCCESS){
        console.log("Connected.");
        RbxURL.openRobloxPlayer(response.url as string);
    }
})();