import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { sku } = useParams();
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const resposta = await fetch(`http://localhost:3001/produto/${sku}`);
        const dados = await resposta.json();
        setProduto(dados);
      } catch (erro) {
        console.error('Erro ao buscar produto:', erro);
      }
    };

    fetchProduto();
  }, [sku]);

  if (!produto) return <p className="text-center mt-10">Carregando produto...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Imagem */}
        <div className="w-full h-auto border-2 border-black-500 rounded-xl p-4 flex items-center justify-center">
          <img
            src={produto.imagem_url || '/images/no-image.png'}
            alt={produto.nome}
            className="object-contain max-h-[400px]"
            onError={(e) => (e.target.src = '/images/no-image.png')}
          />
        </div>

        {/* Detalhes */}
        <div>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Código: </span> {produto.id}
          </p>
          <p className="text-sm text-gray-600 mb-1 font-semibold">Marca: {produto.marca || ''}</p>
          <h1 className="text-2xl font-bold mb-3">{produto.nome}</h1>
          <p className="text-xl font-semibold mb-4">R$ {Number(produto.preco).toFixed(2)}</p>

          {/* Quantidade e botão */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-black-500 rounded px-2">
              <button
                className="text-black font-bold px-2"
                onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
              >
                -
              </button>
              <span className="px-2">{quantidade}</span>
              <button
                className="text-black font-bold px-2"
                onClick={() => setQuantidade(quantidade + 1)}
              >
                +
              </button>
            </div>

            {/* Botão para Adicionar na Sacolinha */}
            <button className="bg-gray-400 hover:bg-black-500 text-black font-semibold py-2 px-4 rounded flex items-center gap-2">
               Adicionar na sacolinha
            </button>
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div className="mt-12 bg-gray-100 p-6 rounded-xl">
        <h2 className="text-lg font-bold mb-2 bg-grey-400 inline-block px-3 py-1 rounded">Descrição</h2>
        <p className="text-gray-700">{produto.description || 'Produto sem descrição.'}</p>
      </div>
    </div>
  );
}

export default ProductPage;
