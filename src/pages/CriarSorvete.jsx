import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080";

export default function CriarPedido({ atendenteId }) {
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState("");
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/tamanhos`)
      .then((res) => res.json())
      .then(setTamanhos);

    fetch(`${BASE_URL}/sabores`)
      .then((res) => res.json())
      .then(setSabores);
  }, []);

  function toggleSabor(id) {
    setSaboresSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  }

  function salvarPedido() {
    if (!tamanhoId || saboresSelecionados.length === 0) {
      alert("Selecione o tamanho e pelo menos um sabor");
      return;
    }

    const pedido = {
      atendenteId,
      tamanhoId,
      saboresIds: saboresSelecionados,
    };

    fetch(`${BASE_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        alert("Pedido criado com sucesso!");
        setSaboresSelecionados([]);
        setTamanhoId("");
      })
      .catch(() => alert("Erro ao criar pedido"));
  }

  return (
    <div>
      <h2>Criar Pedido</h2>

      <h3>Tamanho</h3>
      <select value={tamanhoId} onChange={(e) => setTamanhoId(e.target.value)}>
        <option value="">Selecione</option>
        {tamanhos.map((t) => (
          <option key={t.id} value={t.id}>
            {t.descricao} - R$ {t.precoTamanho}
          </option>
        ))}
      </select>

      <h3>Sabores</h3>
      {sabores.map((s) => (
        <div key={s.id}>
          <label>
            <input
              type="checkbox"
              checked={saboresSelecionados.includes(s.id)}
              onChange={() => toggleSabor(s.id)}
            />
            {s.nome}
          </label>
        </div>
      ))}

      <br />
      <button onClick={salvarPedido}>Finalizar Pedido</button>
    </div>
  );
}
