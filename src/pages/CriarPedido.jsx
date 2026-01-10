import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080";

export default function CriarPedido({ atendenteId }) {
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  const [sorvetesDoPedido, setSorvetesDoPedido] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/tamanhos`).then(r => r.json()).then(setTamanhos);
    fetch(`${BASE_URL}/sabores`).then(r => r.json()).then(setSabores);
  }, []);

  function toggleSabor(id) {
    setSaboresSelecionados(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  }

  function adicionarSorvete() {
    if (!tamanhoId || saboresSelecionados.length === 0) {
      alert("Selecione tamanho e sabores");
      return;
    }

    const tamanho = tamanhos.find(t => t.id === tamanhoId);
    const saboresEscolhidos = sabores.filter(s =>
      saboresSelecionados.includes(s.id)
    );

    const precoSabores = saboresEscolhidos.reduce(
      (acc, s) => acc + s.precoAdicional,
      0
    );

    const precoSorvete = tamanho.precoTamanho + precoSabores;

    const sorvete = {
      tamanho,
      sabores: saboresEscolhidos,
      preco: precoSorvete
    };

    setSorvetesDoPedido(prev => [...prev, sorvete]);
    setTotal(prev => prev + precoSorvete);

    setTamanhoId(null);
    setSaboresSelecionados([]);
  }

  function finalizarPedido() {
    fetch(`${BASE_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        atendenteId,
        tamanhoId: sorvetesDoPedido[0]?.tamanho.id,
        saboresIds: sorvetesDoPedido.flatMap(s =>
          s.sabores.map(sb => sb.id)
        )
      })
    }).then(() => alert(`Pedido criado! Total: R$ ${total}`));
  }

  return (
    <div>
      <h1>Criar Pedido</h1>
      <p><strong>Atendente ID:</strong> {atendenteId}</p>

      <h2>Tamanho</h2>
      {tamanhos.map(t => (
        <div key={t.id}>
          <label>
            <input
              type="radio"
              name="tamanho"
              checked={tamanhoId === t.id}
              onChange={() => setTamanhoId(t.id)}
            />
            {t.descricao} (R$ {t.precoTamanho})
          </label>
        </div>
      ))}

      <h2>Sabores</h2>
      {sabores.map(s => (
        <div key={s.id}>
          <label>
            <input
              type="checkbox"
              checked={saboresSelecionados.includes(s.id)}
              onChange={() => toggleSabor(s.id)}
            />
            {s.nome} (+ R$ {s.precoAdicional})
          </label>
        </div>
      ))}

      <br />
      <button onClick={adicionarSorvete}>Adicionar Sorvete</button>

      <h2>Sorvetes do Pedido</h2>
      {sorvetesDoPedido.length === 0 && <p>Nenhum sorvete adicionado</p>}

      {sorvetesDoPedido.map((s, i) => (
        <div key={i}>
          <strong>{s.tamanho.descricao}</strong> —{" "}
          {s.sabores.map(sb => sb.nome).join(", ")} — R$ {s.preco}
        </div>
      ))}

      <h3>Total: R$ {total}</h3>

      <button onClick={finalizarPedido}>Finalizar Pedido</button>
    </div>
  );
}
