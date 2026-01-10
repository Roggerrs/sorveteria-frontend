import React, { useState } from "react";
import { criarPedido } from "../api/api.js";
import CriarSorvete from "./CriarSorvete";

export default function CriarPedido({ atendenteId }) {
  const [sorvetes, setSorvetes] = useState([]);
  const [pedidoCriado, setPedidoCriado] = useState(null);

  function adicionarSorvete(sorvete) {
    setSorvetes([...sorvetes, sorvete]);
  }

  function removerSorvete(index) {
    setSorvetes(sorvetes.filter((_, i) => i !== index));
  }

  async function handleCriarPedido() {
    if (sorvetes.length === 0) {
      alert("Adicione pelo menos um sorvete");
      return;
    }

    const payload = {
      atendenteId,
      sorvetes: sorvetes.map(s => ({
        tamanhoId: s.tamanhoId,
        sabores: s.saboresIds
      }))
    };

    try {
      const resposta = await criarPedido(payload);
      setPedidoCriado(resposta);
      setSorvetes([]);
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

      <CriarSorvete onAdicionar={adicionarSorvete} />

      <h3>Sorvetes do Pedido</h3>

      {sorvetes.length === 0 && <p>Nenhum sorvete adicionado</p>}

      <ul>
        {sorvetes.map((s, index) => (
          <li key={index}>
            <strong>{s.tamanhoDescricao}</strong><br />
            Sabores: {s.saboresNomes.join(", ")}<br />
            <button onClick={() => removerSorvete(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <br />

      <button onClick={handleCriarPedido}>
        Criar Pedido
      </button>

      {/* RESUMO DO PEDIDO RETORNADO PELO BACKEND */}
      {pedidoCriado && (
        <>
          <hr />
          <h3>Pedido Criado</h3>
          <p><strong>ID:</strong> {pedidoCriado.id}</p>
          <p><strong>Atendente:</strong> {pedidoCriado.nomeAtendente}</p>

          <ul>
            {pedidoCriado.sorvetes.map((s, i) => (
              <li key={i}>
                {s.tamanho} — {s.sabores.join(", ")} — R$ {s.valor}
              </li>
            ))}
          </ul>

          <h3>Valor Total: R$ {pedidoCriado.valorTotal}</h3>
        </>
      )}
    </div>
  );
}
