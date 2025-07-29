/*import React, { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

function App() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const buscaDebounced = useDebounce(busca, 300); // espera 300ms após digitar

  const fetchProdutos = async (termo = '') => {
    try {
      const resposta = await fetch(`http://localhost:3001/produtos?busca=${termo}`);
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (erro) {
      console.error('Erro ao buscar produtos:', erro);
    }
  };

  // Executa quando o usuário parar de digitar por 300ms
  useEffect(() => {
    console.log('🔎 Buscando por:', buscaDebounced);
    fetchProdutos(buscaDebounced);
  }, [buscaDebounced]);

  const handleBusca = (e) => {
    setBusca(e.target.value); // apenas atualiza o texto
  };

  return (
    <div className="bg-white min-h-screen p-6">
      #{ Header }
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold">Minha Loja</h1>
        <input
          type="text"
          value={busca}
          onChange={handleBusca}
          placeholder="Buscar produtos..."
          className="border border-gray-300 p-2 rounded w-64"
        />
      </header>

      #{ Lista de produtos }
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
              onError={(e) => { e.target.src = '/images/124133-ph-ma-1.jpg'; }}
            />
            <h2 className="text-lg font-semibold mb-1">{produto.nome}</h2>
            <p className="text-gray-700 mb-3">
              R$ {Number(produto.preco).toFixed(2)}
            </p>
            <button className="border border-black px-4 py-2 rounded hover:bg-gray-100">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProdutoDetalhe from './pages/ProdutoDetalhe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:sku" element={<ProdutoDetalhe />} />
      </Routes>
    </Router>
  );
}

export default App;
