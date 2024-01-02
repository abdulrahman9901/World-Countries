const { execSync } = require('child_process');
execSync('npm install --arch=x64 --platform=linux --target=14.17.5 --unsafe-perm=true --allow-root sharp', { stdio: 'inherit' });
