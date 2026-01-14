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
    <div className="container">
      <h1>Pedidos</h1>

      <ul className="list">
        {pedidos.map(p => (
          <li key={p.id} className="card">
            <span>
              Pedido #{p.id} — R$ {p.valorTotal}
            </span>
            <button onClick={() => navigate(`/pedidos/${p.id}`)}>
              Ver detalhes
            </button>
          </li>
        ))}
      </ul>

      <div className="actions">
        <button onClick={() => navigate("/")}>Novo pedido</button>
        <button className="secondary" onClick={() => navigate("/relatorios")}>
          Relatórios
        </button>
      </div>
    </div>
  );
}
