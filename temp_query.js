import fs from 'fs';

async function getArgs() {
  const query = `
    query {
      __schema {
        queryType {
          fields {
            name
            args {
              name
            }
          }
        }
      }
    }
  `;
  try {
    const res = await fetch('https://api.dropea.com/graphql/dropshippers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': 'AIzaP1ltDwuOh4UrOGMxtm66iImf4SNdiGHlYhcSAmRW8HE=' },
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    const prodField = json.data.__schema.queryType.fields.find(f => f.name === 'products');
    fs.writeFileSync('temp_args.json', JSON.stringify(prodField.args.map(a => a.name)));
    console.log("Done");
  } catch (e) { console.error(e) }
}
getArgs();
