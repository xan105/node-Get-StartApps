import apps, { has } from '../lib/index.js';

//Listing
 
console.log( await apps("Xbox") );
console.log( await apps({name:"Game Bar", appID:"GamingOverlay"}) );
console.log( await apps({name:"Microsoft"}) );
console.log( await apps({appID:"Xbox"}) );
console.log( (await apps()).length );
console.log( (await apps("")).length );
console.log( (await apps({})).length );
console.log( (await apps(null)).length );
console.log( (await apps(undefined)).length );
  
//Has (boolean)
  
await has().catch(console.error);
await has("").catch(console.error);
await has({}).catch(console.error);
await has(null).catch(console.error);
await has(undefined).catch(console.error);
await has({id:"GamingOverlay"}).catch(console.error);
await has({id:""}).catch(console.error);
  
console.log( await has("Xbox") ); //true
console.log( await has({appID:"GamingOverlay"}) ); //true
console.log( await has({name:"Game Bar"}) ); //true
console.log( await has({appID:"GamingOverlay", name: "Game Bar"}) ); //true
console.log( await has("Playstation 2") ); //false