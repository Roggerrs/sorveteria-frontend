import React, { useEffect, useState } from "react";
import { listarPedidos } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarPedidos()
      .then(setPedidos)
      .catch(() => alert("Erro ao carregar pedidos"));
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

      <br />

      <button onClick={() => navigate("/")}>
        Novo pedido
      </button>

      {" "}

      <button onClick={() => navigate("/relatorios")}>
        Relatórios
      </button>
    </div>
  );
}
