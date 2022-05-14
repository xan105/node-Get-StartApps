/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { exec } from "node:child_process";
import { promisify } from "node:util";
import { Failure } from "@xan105/error";
import { isStringNotEmpty, isObjNotEmpty, isObjWithProperties } from "@xan105/is";

async function getStartApps(search = {}){

  let cmd = ["Get-StartApps"];

  if (isStringNotEmpty(search)){
    cmd.push(`"${search}"`);
  } 
  else if (isObjNotEmpty(search)) {
    if (isStringNotEmpty(search.name))
      cmd.push(`"${search.name}"`);
    if (isStringNotEmpty(search.appID))
      cmd.push(`| Where-Object {$_.AppID -match '.*${search.appID}.*' }`);
  }
  cmd.push("| Format-List");

  const ps = await promisify(exec)(`powershell -NoProfile "${cmd.join(' ')}"`, {windowsHide: true});
  if (ps.stderr) throw new Failure(ps.stderr, "ERR_UNEXPECTED_POWERSHELL_FAIL");

  try{
    const output = ps.stdout.split("\r\n\r\n").filter(line => line != ""); //Filter out blank space
    const result = output.map((line) => {   
      const col = line.trim().split("\r\n");
      const getValue = (string) => string.substring(string.indexOf(":") + 1, string.length).trim();
      return {
        name: getValue(col[0]),
        appID: getValue(col[1])
      }  
    });
    return result;
  }catch{
    return [];
  }

}

async function has(search){

  if (
    !isStringNotEmpty(search) && 
    !(isObjWithProperties(search, ["name"]) && isStringNotEmpty(search.name)) && 
    !(isObjWithProperties(search, ["appID"]) && isStringNotEmpty(search.appID))
  ) {
    throw new Failure("Search parameter required !", { code: 1, info: {type: typeof search, value: search} });
  }

  const apps = await getStartApps(search);
  return apps.length > 0; 
}

function isValidAUMID(appID){ // Check if appID is a valid UWP Application User Model ID
  
  if (typeof appID !== 'string') throw "appID must be a string";

  appID = appID.trim();

  if ( appID.length > 128 || appID.includes(" ") || !appID.includes("!")) return false;

  const [familyname] = appID.split("!");

  if(!familyname.includes("_")) return false;

  const [name] = familyname.split("_");

  const sections = name.split(".");

  if (sections.length > 4 || sections.length  < 2 ) return false 

  return true;
}

export {
  getStartApps as default,
  has,
  isValidAUMID
}