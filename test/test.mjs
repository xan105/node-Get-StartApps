import apps from '../lib/esm.mjs';

(async() => {
  
  let test;
  
  //Listing
 
  test = await apps("Xbox");
  console.log(test);
  
  console.log("\r\n");
  
  test = await apps({name:"Game Bar",id:"GamingOverlay"});
  console.log(test);
  
  console.log("\r\n");
  
  test = await apps({name:"Microsoft"});
  console.log(test);
  
  console.log("\r\n");
  
  test = await apps({id:"Xbox"});
  console.log(test);
  
  console.log("\r\n");
  
  test = await apps();
  console.log(test.length);
  
  test = await apps("");
  console.log(test.length);
  
  test = await apps({});
  console.log(test.length);
  
  test = await apps(null);
  console.log(test.length);
  
  test = await apps(undefined);
  console.log(test.length);
  
  //Has (boolean)
  
  test = await apps.has(); //false
  console.log(test);
  
  test = await apps.has(""); //false
  console.log(test);
  
  test = await apps.has({}); //false
  console.log(test);
  
  test = await apps.has(null); //false
  console.log(test);
  
  test = await apps.has(undefined); //false
  console.log(test);
  
  test = await apps.has("Xbox"); //true
  console.log(test); 
  
  test = await apps.has({id:"GamingOverlay"}); //true
  console.log(test); 
  
  test = await apps.has({name:"Game Bar"}); //true
  console.log(test);
  
  test = await apps.has({id:"GamingOverlay", name: "Game Bar"}); //true
  console.log(test);

})().catch(console.error);