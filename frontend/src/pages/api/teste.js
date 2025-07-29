// pages/api/teste.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { mensagem } = req.body;
    res.status(200).json({ resposta: `Você digitou: ${mensagem}` });
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}