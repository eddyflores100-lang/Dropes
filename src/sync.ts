import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const DROPEA_TOKEN = "AIzaP1ltDwuOh4UrOGMxtm66iImf4SNdiGHlYhcSAmRW8HE=";

const query = `
query GetBulkProducts {
  products(limit: 100) {
    data {
      id
      name
      description
      images
      cost_price
    }
  }
}
`;

async function sync() {
  console.log("Iniciando sincronización masiva estática de Dropea...");
  try {
    const response = await axios.post('https://api.dropea.com/graphql/dropshippers', {
      query: query
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': DROPEA_TOKEN
      }
    });

    if (!response.data || !response.data.data || !response.data.data.products) {
      throw new Error("No se pudo obtener el catálogo masivo.");
    }

    const allProducts = response.data.data.products.data;
    console.log(`Analizando ${allProducts.length} productos de Dropea...`);

    const mappedProducts = allProducts.map((p: any) => {
      const cost = parseFloat(p.cost_price) || 0;
      // Calculate a healthy profit margin (approx 40-50%)
      // Example: Cost 10€ -> Sell 19.90€
      const margin = 1.9;
      const priceNow = (cost * margin).toFixed(2);
      const priceWas = (cost * (margin + 0.5)).toFixed(2);

      // Determine category based on product name or description
      let category = "Hogar";
      if (/cocina|sarten|olla|freidora/i.test(p.name)) category = "Cocina";
      else if (/belleza|cara|pelo|maquillaje/i.test(p.name)) category = "Belleza";
      else if (/fitness|deporte|pesas/i.test(p.name)) category = "Deporte";
      else if (/tecnologia|gadget|auriculares/i.test(p.name)) category = "Tecnología";
      else if (/niño|juguete|bebe/i.test(p.name)) category = "Niños";

      return {
        id: p.id, // Keep original ID string
        numeric_id: parseInt(p.id),
        name: p.name,
        brand: "Dropea Premium",
        description: p.description || "",
        priceNow: priceNow,
        priceWas: priceWas,
        cost: cost,
        profit: (parseFloat(priceNow) - cost).toFixed(2),
        image: p.images && p.images.length > 0 ? p.images[0] : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
        stars: (Math.random() * (5 - 4.2) + 4.2).toFixed(1),
        reviews: Math.floor(Math.random() * 500) + 50 + " opiniones",
        category: category,
        tag: cost > 15 ? "MAYOR RENTABILIDAD" : "Novedad"
      };
    }).sort((a: any, b: any) => parseFloat(b.profit) - parseFloat(a.profit)); // Sort by profitability

    const outputPath = './src/data/products.json';
    fs.writeFileSync(outputPath, JSON.stringify(mappedProducts, null, 2));

    console.log(`¡Éxito! Guardados ${mappedProducts.length} productos en ${outputPath}`);
  } catch (error: any) {
    console.error("Error en sincronización:", error.message);
    process.exit(1);
  }
  process.exit(0);
}

sync();
