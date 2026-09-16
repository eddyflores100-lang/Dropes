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
          query {
            products(limit: 1) {
              data {
                id
                name
                variants {
                  id
                }
              }
            }
          }
        `
            })
        });
        const info = await res.json();
        console.log(JSON.stringify(info, null, 2));
    } catch (e) {
        console.log("ERROR", e);
    }
}
run();
