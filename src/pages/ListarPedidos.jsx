import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080";

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/pedidos`)
      .then(res => res.json())
      .then(setPedidos);
  }, []);

  return (
    <div>
      <h1>Pedidos</h1>

      <ul>
        {pedidos.map(p => (
          <li key={p.id}>
            Pedido #{p.id} — Total R$ {p.valorTotal}
          </li>
        ))}
      </ul>
    </div>
  );
}
