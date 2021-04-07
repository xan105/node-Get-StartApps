import apps from '../lib/esm.mjs';

const code = {
  reset : "\x1b[0m",
  red : "\x1b[31m",
  green : "\x1b[32m",
};

apps().then((result)=>{
  for (let app of result) {
    apps.isValidAUMID(app.appid) ? console.log(`${code.green}${app.appid}${code.reset}`) : console.log(`${code.red}${app.appid}${code.reset}`);
  }
}).catch((err)=>{
  console.error(err);
});