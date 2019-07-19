const ps = require("./Get-StartApps.js");

(async() => {
  
  let test;
  
  //Listing
  
  test = await ps(null);
  console.log(test);
  
  console.log("\r\n");
 
  test = await ps("Xbox");
  console.log(test);
  
  console.log("\r\n");
  
  test = await ps({name:"Game Bar",id:"GamingOverlay"});
  console.log(test);
  
  console.log("\r\n");
  
  test = await ps({name:"Microsoft"});
  console.log(test);
  
  console.log("\r\n");
  
  test = await ps({id:"Xbox"});
  console.log(test);
  
  console.log("\r\n");
  
  test = await ps();
  console.log(test);
  
  //Has (boolean)
  
  test = await ps.has(); //false
  
  console.log(test);
  
  test = await ps.has(null); //false
  
  console.log(test);
  
  test = await ps.has("Xbox"); //true
  
  console.log(test); 
  
  test = await ps.has({id:"GamingOverlay"}); //true
  
  console.log(test); 
  
  test = await ps.has({name:"Game Bar"}); //true
  
  console.log(test);
  
  test = await ps.has({id:"GamingOverlay", name: "Game Bar"}); //true
  
  console.log(test);

})().catch(err => console.error(err));