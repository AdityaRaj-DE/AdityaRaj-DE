const https = require('https');
const fs = require('fs');

https.get('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } }, (res) => {
  let css = '';
  res.on('data', d => css += d);
  res.on('end', () => {
    const urlMatch = css.match(/url\((https:\/\/[^\)]+)\)/);
    if(urlMatch) {
      const fontUrl = urlMatch[1];
      https.get(fontUrl, (fontRes) => {
        const chunks = [];
        fontRes.on('data', d => chunks.push(d));
        fontRes.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const base64 = buffer.toString('base64');
          const cssInject = `@font-face { font-family: 'Press Start 2P'; font-style: normal; font-weight: 400; src: url(data:font/woff2;charset=utf-8;base64,${base64}) format('woff2'); }`;
          const code = `export const pressStart2PFont = \`${cssInject}\`;\n`;
          fs.writeFileSync('src/utils/fonts.ts', code);
          console.log('Font successfully fetched and encoded to src/utils/fonts.ts');
        });
      });
    } else {
      console.error('Could not find font URL in CSS');
    }
  });
});
