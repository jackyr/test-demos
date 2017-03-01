var exec = require('child_process').execSync;

exec(`git add .`);
exec(`git commit -m "update"`);
exec('git push');
