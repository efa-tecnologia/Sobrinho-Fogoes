import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const buscaDebounced = useDebounce(busca, 300);
  const navigate = useNavigate();

  const fetchProdutos = async (termo = '') => {
    try {
      const resposta = await fetch(`http://localhost:3001/produtos?busca=${termo}`);
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (erro) {
      console.error('Erro ao buscar produtos:', erro);
    }
  };

  useEffect(() => {
    fetchProdutos(buscaDebounced);
  }, [buscaDebounced]);

  const handleBusca = (e) => {
    setBusca(e.target.value);
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold">Sobrinho Fogoes</h1>
        <input
          type="text"
          value={busca}
          onChange={handleBusca}
          placeholder="Buscar produtos..."
          className="border border-gray-300 p-2 rounded w-64"
        />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.length === 0 && (
          <p className="col-span-full text-center text-gray-500">Nenhum produto encontrado.</p>
        )}
        {produtos.map((produto) => (
          <div
            key={`${produto.sku}-${produto.company_id}`}
            className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm"
          >
            <img
              src={produto.imagem_url}
              alt={produto.nome}
              className="h-40 object-contain mb-4"
              onError={(e) => { e.target.src = '/images/no-image.png'; }}
            />
            <h2 className="text-lg font-semibold mb-1">{produto.nome}</h2>
            <p className="text-gray-700 mb-3">
              R$ {Number(produto.preco).toFixed(2)}
            </p>
            <button
              onClick={() => navigate(`/produto/${produto.sku}`)}
              className="border border-black px-4 py-2 rounded hover:bg-gray-100"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;