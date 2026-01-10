import React, { useEffect, useState } from "react";
import { getTamanhos, getSabores, criarPedido } from "../api/api.js";

export default function CriarPedido({ atendenteId }) {
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    getTamanhos().then(setTamanhos);
    getSabores().then(setSabores);
  }, []);

  function toggleSabor(id) {
    if (saboresSelecionados.includes(id)) {
      setSaboresSelecionados(
        saboresSelecionados.filter(s => s !== id)
      );
    } else {
      setSaboresSelecionados([...saboresSelecionados, id]);
    }
  }

  async function handleCriarPedido() {
  if (!tamanhoId) {
    alert("Selecione um tamanho");
    return;
  }

  const payload = {
    atendenteId,
    tamanhoId,
    sabores: saboresSelecionados
  };

  try {
    const pedidoCriado = await criarPedido(payload);
    setMensagem(
      `Pedido criado com sucesso! Valor total: R$ ${pedidoCriado.valorTotal}`
    );
    setSaboresSelecionados([]);
    setTamanhoId(null);
  } catch (e) {
    alert("Erro ao criar pedido");
  }
}


  return (
    <div>
      <h2>Criar Pedido</h2>

      <p>
        <strong>Atendente ID:</strong> {atendenteId}
      </p>

      <h3>Tamanho</h3>
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

      <h3>Sabores</h3>
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

      <button onClick={handleCriarPedido}>
        Criar Pedido
      </button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
