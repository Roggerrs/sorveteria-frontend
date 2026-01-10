import React, { useState } from "react";
import { criarPedido } from "../api/api.js";


export default function CriarPedido({ atendenteId }) {
  const [mensagem, setMensagem] = useState("");

  async function enviarPedido() {
    try {
      await criarPedido({
        atendenteId: atendenteId,
        sorvetes: []
      });

      setMensagem("Pedido criado com sucesso!");
    } catch (e) {
      setMensagem("Erro ao criar pedido");
    }
  }

  return (
    <div>
      <h2>Criar Pedido</h2>
      <p>Atendente ID: {atendenteId}</p>

      <button onClick={enviarPedido}>Criar Pedido</button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
