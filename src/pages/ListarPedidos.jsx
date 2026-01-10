import React, { useEffect, useState } from "react";
import { listarPedidos } from "../api/api.js";


export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    listarPedidos().then(setPedidos);
  }, []);

  return (
    <div>
      <h2>Lista de Pedidos</h2>

      {pedidos.length === 0 && <p>Nenhum pedido encontrado</p>}

      <ul>
        {pedidos.map(p => (
          <li key={p.id}>
            Pedido #{p.id} — Atendente: {p.nomeAtendente}
          </li>
        ))}
      </ul>
    </div>
  );
}
