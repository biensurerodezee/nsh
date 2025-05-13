// requestHttpsPublishSurge.nsh
const https = require('https');
const fs = require('fs');
const shell = require('shelljs');

function getJoke() {
  return new Promise((resolve, reject) => {
    https.get('https://official-joke-api.appspot.com/random_joke', res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

const joke = await getJoke();

const html = `<html><body><h1>${joke.setup}</h1><p>${joke.punchline}</p></body></html>`;
fs.mkdirSync('joke-site', { recursive: true });
fs.writeFileSync('joke-site/index.html', html);

console.log('✅ Joke written, deploying...');

const result = shell.exec('surge joke-site https://joking.surge.sh');

if (result.code === 0) {
  console.log('🎉 Success: Deployed to https://joking.surge.sh');
} else {
  console.error('❌ Surge failed:', result.stderr);
}
