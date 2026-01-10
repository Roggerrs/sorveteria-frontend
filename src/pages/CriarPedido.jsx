import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080";

export default function CriarPedido({ atendenteId }) {
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

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

  function finalizarPedido() {
    fetch(`${BASE_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        atendenteId,
        tamanhoId,
        saboresIds: saboresSelecionados
      })
    }).then(() => alert("Pedido criado com sucesso"));
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
              value={t.id}
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
              onChange={() => toggleSabor(s.id)}
            />
            {s.nome} (+ R$ {s.precoAdicional})
          </label>
        </div>
      ))}

      <br />
      <button onClick={finalizarPedido}>Finalizar Pedido</button>
    </div>
  );
}
