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
            __type(name: "OrderProductInputType") {
              inputFields {
                name
                type {
                  name
                  kind
                  ofType {
                    name
                    kind
                  }
                }
              }
            }
          }
        `
            })
        });
        const data = await res.json();
        console.log(JSON.stringify(data.data.__type.inputFields, null, 2));
    } catch (e) {
        console.error(e);
    }
}
run();
