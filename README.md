<div align="center">
	<h1>rbx-url</h1>
	<p>
		<a href="https://www.npmjs.com/package/rbx-url"><img src="https://img.shields.io/npm/v/rbx-url?maxAge=3600" alt="NPM version"></a>
		<a href="https://www.npmjs.com/package/rbx-url"><img src="https://img.shields.io/npm/dt/rbx-url?maxAge=3600" alt="NPM downloads"></a>
  	</p>
  	<p><a href="https://www.npmjs.com/package/rbx-url"><img src="https://nodei.co/npm/rbx-url.png?downloads=true&stars=true" alt="NPM Banner"></a></p>
</div>
<div align="center">
	<img src="https://cdn.discordapp.com/attachments/932315608463323226/955194144064671774/carbon.png">
	<br><br>
</div>

## 📂 | Installation
```sh
npm i rbx-url
```

## 📜 | Setup
```js
const RbxURL = require("rbx-url"); // Define rbx-url module
const instance = await RbxURL.new("[...]", {
	placeId: [...],
	browserTrackerId: [...],
	locale: "fr_fr"
}); // Initializing RBX-Url

if(instance.status === RbxURL.ROBLOX_SUCCESS) RbxURL.openRobloxPlayer(instance.url); // If the instance is okay, run Roblox.
```


## 👥 | Contact
<a href="https://twitter.com/Micorksen" target="_blank"><img src="https://img.shields.io/badge/Twitter-@Micorksen-blue?style=for-the-badge&logo=twitter" alt="Twitter"></a>
<a href="https://micorksen.xyz" target="_blank"><img src="https://img.shields.io/badge/Site-micorksen.xyz-orange?style=for-the-badge&logo=brave" alt="Site"></a>
