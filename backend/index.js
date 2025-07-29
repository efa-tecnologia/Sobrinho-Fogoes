const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());

// Rota para lista com busca
app.get('/produtos', async (req, res) => {
  const busca = req.query.busca || '';
  const query = `
    SELECT 
      cp.product_id AS id,
      cp.sku,
      cp.company_id,
      cp.name AS nome,
      cp.price AS preco,
      CASE 
        WHEN i.objects->0->>'file' IS NULL OR i.objects->0->>'file' = '' THEN NULL
        ELSE CONCAT('https://cdn.sualoja.com/', i.objects->0->>'file')
      END AS imagem_url
    FROM 
      company_products cp
    LEFT JOIN 
      images i ON cp.image_id = i.id
    WHERE 
      cp.is_active = true 
      AND cp.company_id = 1
      AND cp.name ILIKE $1
  `;
  const { rows } = await db.query(query, [`%${busca}%`]);
  res.json(rows);
});


app.get('/produto/:sku', async (req, res) => {
  const { sku } = req.params;

  try {
    const query = `
      SELECT 
        cp.product_id AS id,
        cp.sku,
        cp.company_id,
        cp.name AS nome,
        cp.price AS preco,
        p.description,
        b.name AS marca,
        CASE 
          WHEN i.objects IS NULL 
            OR jsonb_typeof(i.objects) != 'array' 
            OR jsonb_array_length(i.objects) = 0 
            OR i.objects->0->>'file' IS NULL THEN NULL
          ELSE CONCAT('https://cdn.sualoja.com/', i.objects->0->>'file')
        END AS imagem_url
      FROM 
        company_products cp
      LEFT JOIN 
        products p ON cp.product_id = p.id
      LEFT JOIN 
        images i ON cp.image_id = i.id
      LEFT JOIN 
        brands b ON cp.brand_id = b.id
      WHERE 
        cp.is_active = true 
        AND cp.company_id = 1 
        AND cp.sku = $1
    `;

    const { rows } = await db.query(query, [sku]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar produto:', error); // log detalhado
    res.status(500).json({ erro: 'Erro no servidor', detalhe: error.message });
}
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
