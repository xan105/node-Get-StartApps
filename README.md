About
=====

Wrapper for the Powershell Get-StartApps command.

Examples
========

Get every apps:

```js
import getapps from "get-startapps";

const apps = await getapps();
/* OUTPUT
[ 
  { 
    name: '...',
    appID: '...' 
  },
  ... 
] 
*/

//Keep only UWP apps
const UWP = apps.filter(app => isValidAUMID(app.appID))
```

Search:

```js
import getapps from "get-startapps";

await getapps("Xbox");
await getapps({name: "Xbox"}); //search by name only
await getapps({appID: "Xbox"}); //search by appID only
await getapps({name: "Xbox", appID:"GamingOverlay"}) //search by name and appID
```

Has GamingOverlay (Microsoft.Xbox**GamingOverlay**_8wekyb3d8bbwe!App) ? :

```js
import { has } from "get-startapps";
has({id:"GamingOverlay"}) //true or false
```

Is "Microsoft.WindowsStore_8wekyb3d8bbwe!App" a valid **UWP** Application User Model ID ?

```js
import { isValidAUMID } from "get-startapps";
isValidAUMID("Microsoft.WindowsStore_8wekyb3d8bbwe!App")); //true 
```

Installation
============

```
npm install get-startapps
```

API
===

⚠️ This module is only available as an ECMAScript module (ESM) starting with version 2.0.0.<br />
Previous version(s) are CommonJS (CJS) with an ESM wrapper.

## Default export

#### `(search?: string | object): Promise<obj[]>`

Invok Get-StartApps with an optional search.

if `search` is 
- a string this is eq to `Get-StartApps %search%`
- an object `{name?: string, appID?: string}` then search for either matching name, appid or both.
- omitted/empty object this is eq to `Get-StartApps` and it will list all available apps.

Returns an array of object :

```ts
[{ 
  name: string,
  appID: string 
}]
```

Example:

```js
import getapps from "get-startapps";

await getapps("Xbox");
await getapps({name:"Game Bar",id:"GamingOverlay"}); //both properties
await getapps({name:"Microsoft"}); //by name only
await getapps({id:"Xbox"}); //by id only
await getapps(); //list all
```

## Named export

#### `has(search: string | object): Promise<boolean>`

Like default export but return a boolean if found or not.<br/>
A valid search paramater (not empty) is required.

Example:

```js
import { has } from "get-startapps";

await has("Xbox");
await has({id:"GamingOverlay", name: "Game Bar"}); //both properties
await has({id:"GamingOverlay"}); //by name only
await has({name:"Game Bar"}); //by id only
```

#### `isValidAUMID(appID: string): boolean`
  
Check if appID is a valid **UWP** Application User Model ID.
   
Example:

```js
import { isValidAUMID } from "get-startapps";
  
isValidAUMID("Microsoft.WindowsStore_8wekyb3d8bbwe!App")); //true
isValidAUMID("com.squirrel.GitHubDesktop.GitHubDesktop")); //false
```