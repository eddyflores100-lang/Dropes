const fs = require('fs');
async function run() {
  try {
    const res = await fetch('https://api.dropea.com/graphql/dropshippers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'AIzaP1ltDwuOh4UrOGMxtm66iImf4SNdiGHlYhcSAmRW8HE='
      },
      body: JSON.stringify({
        query: `
          query GetInputTypes {
            CustomerInput: __type(name: "CustomerInputType") {
              inputFields { name type { name kind ofType { name kind } } }
            }
            OrderItemInput: __type(name: "OrderProductInputType") {
              inputFields { name type { name kind ofType { name kind } } }
            }
          }
        `
      })
    });
    const data = await res.json();
    fs.writeFileSync('input_types.json', JSON.stringify(data.data, null, 2));
    console.log('Saved to input_types.json');
  } catch (e) {
    console.error(e);
  }
}
run();
