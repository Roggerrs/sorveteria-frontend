import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarPedidos } from "../api/api.js";

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarPedidos().then(setPedidos);
  }, []);

  return (
    <div>
      <h1>Pedidos</h1>

      <ul>
        {pedidos.map(p => (
          <li key={p.id}>
            <button
              onClick={() => navigate(`/pedidos/${p.id}`)}
              style={{ cursor: "pointer" }}
            >
              Pedido #{p.id} — Total R$ {p.valorTotal}
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/")}>
        Novo pedido
      </button>
    </div>
  );
}
