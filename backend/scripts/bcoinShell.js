import { exec } from 'child_process';

exec("bcoin-cli info", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }

  const out = JSON.parse(stdout);
  console.log(`stdout: ${Object.keys( out )}`);


});