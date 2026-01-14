import { useEffect, useState } from "react";
import { listarPedidos } from "../api/api";
import { Link } from "react-router-dom";

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    listarPedidos().then(setPedidos);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pedidos</h2>

      <ul>
        {pedidos.map((p) => (
          <li key={p.id}>
            Pedido #{p.id} -{" "}
            <Link to={`/pedidos/${p.id}`}>Detalhes</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
