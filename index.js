const fs = require('fs').promises;

async function run() {
  // Open defunct.html
  const html = (await fs.readFile('./defunct.html')).toString();

  // Get list of matches
  const matches = Array.from(html.matchAll(/\((\d{4})[^)]*(\d{4})\)/g));
  const [firstMatch] = matches;
  const rows = matches.map(match => {
    return `${match[1]},${match[2]}`; 
  });
  rows.unshift('start,end');
  console.log(rows[0], rows[1], rows[2]);

  // Export to CSV
  await fs.writeFile('./years.csv', rows.join('\n'));
}

run();