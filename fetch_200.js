import fs from 'fs';
import path from 'path';

const DROPEA_API_KEY = "AIzaP1ltDwuOh4UrOGMxtm66iImf4SNdiGHlYhcSAmRW8HE=";

async function fetchProducts() {
    try {
        let allProducts = [];

        for (let page = 1; page <= 5; page++) {
            const query = `
        query {
          products(page: ${page}, limit: 50) {
            data {
              id
              name
              image
              cost_price
              fulfillment_cost
            }
          }
        }
      `;

            const res = await fetch('https://api.dropea.com/graphql/dropshippers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': DROPEA_API_KEY
                },
                body: JSON.stringify({ query })
            });

            if (!res.ok) {
                console.error("HTTP ERROR:", res.status, res.statusText);
                break;
            }

            const json = await res.json();
            if (json.errors) {
                console.error("GRAPHQL ERROR:", JSON.stringify(json.errors, null, 2));
                break;
            }

            const rawProducts = json.data.products.data;
            if (rawProducts.length === 0) break;

            allProducts.push(...rawProducts);
            console.log(`Fetched page ${page}, total so far: ${allProducts.length}`);
            if (allProducts.length >= 200) break;
        }

        // Price calculation logic
        const SHIPPING_COST = 4.90;
        const MIN_PROFIT = 18;

        const keywords = {
            'Tecnología': ['smartwatch', 'auricular', 'inalámbrico', 'lámpara', 'led', 'proyector', 'cámara', 'consola', 'gamepad', 'micrófono', 'cable', 'luz', 'altavoz', 'drone', 'reloj', 'usb', 'bluetooth', 'funda', 'soporte localizador', 'pantalla', 'móvil', 'smart'],
            'Hogar': ['humidificador', 'mopa', 'fregona', 'aspiradora', 'organizador', 'limpiador', 'ducha', 'cepillo', 'mascota', 'perro', 'gato', 'cinta', 'jardín', 'pistola', 'cojín', 'sofá', 'manta', 'funda protectora', 'ambientador', 'toalla', 'cubertería', 'escoba'],
            'Belleza': ['masajeador', 'depiladora', 'puntos negros', 'rizador', 'cabello', 'plancha', 'faja', 'sujetador', 'piernas', 'pelo', 'facial', 'espejo', 'limpieza', 'perfume', 'pendientes', 'parches', 'antiarrugas', 'cepillo dental', 'maquillaje', 'lifting'],
            'Deporte': ['ejercicio', 'fitness', 'rodillo', 'abdomen', 'bandas', 'pesa', 'botella', 'rodillera', 'faja reductora', 'muñequera', 'plantillas', 'esterilla', 'yoga', 'entrenamiento'],
            'Cocina': ['licuadora', 'sartén', 'cuchillo', 'batidora', 'afilador', 'dispensador', 'tapón', 'molinillo', 'picadora', 'escurridor', 'rallador', 'termómetro', 'utensilios', 'taza', 'vaso', 'saca corchos', 'sacacorchos', 'olla', 'abrelatas'],
            'Niños': ['juguete', 'peluche', 'burbujas', 'dibujo', 'biberón', 'manta', 'cuna', 'bebé', 'cochecito', 'pistola de agua', 'lámpara noche', 'bloques', 'sonajero', 'pañalera']
        };

        const formattedProducts = allProducts.map(p => {
            const productCost = p.cost_price || 5.0;
            const fulfillCost = p.fulfillment_cost || 1.60;
            const totalCost = productCost + fulfillCost + SHIPPING_COST;

            let pvp = totalCost * 2.2;
            if ((pvp - totalCost) < MIN_PROFIT) {
                pvp = totalCost + MIN_PROFIT;
            }
            let roundedPvp = Math.floor(pvp) + 0.90;
            let priceWas = Math.floor(roundedPvp * 1.6) + 0.90;
            let profit = roundedPvp - totalCost;

            const nameLower = (p.name || '').toLowerCase();
            let foundCategory = 'Hogar'; // Default changed to Hogar based on keywords to match general catalog
            for (const [cat, words] of Object.entries(keywords)) {
                if (words.some(w => nameLower.includes(w))) {
                    foundCategory = cat;
                    break;
                }
            }

            const reviewCount = Math.floor(Math.random() * 500) + 10;
            const stars = (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1);

            return {
                id: (p.id || '').toString(),
                numeric_id: parseInt(p.id || 0, 10),
                name: p.name,
                priceNow: roundedPvp.toFixed(2),
                priceWas: priceWas.toFixed(2),
                profit: profit.toFixed(2),
                original_cost: productCost.toFixed(2),
                image: p.image || "https://api.dropea.com/default-image.jpg",
                stars: stars,
                reviews: `${reviewCount} opiniones`,
                category: foundCategory,
                tag: reviewCount > 300 ? "SUPER VENTAS" : (profit > 20 ? "PREMIUM" : "")
            };
        });

        const outPath = 'c:/Users/Usuario/Dropes/src/data/products.json';
        fs.writeFileSync(outPath, JSON.stringify(formattedProducts, null, 2));
        console.log(`Successfully wrote ${formattedProducts.length} products to products.json`);

    } catch (err) {
        console.error("Exception:", err);
    }
}

fetchProducts();
