const pdf = require('pdf-parse');
const fs = require('fs');

pdf(fs.readFileSync('D:/ADM/Downloads/1.-FEAUU-IMPACTO-SOCIAL-2024.pdf'))
  .then(data => {
    console.log(data.text);
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
