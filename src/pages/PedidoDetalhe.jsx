import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarPedidoDetalhe } from "../api/api.js";

export default function PedidoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pedido, setPedido] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarPedidoDetalhe(id)
      .then(setPedido)
      .catch(() => setErro("Erro ao carregar detalhes do pedido"));
  }, [id]);

  if (erro) return <p>{erro}</p>;
  if (!pedido) return <p>Carregando pedido...</p>;

  return (
    <div>
      <h1>Pedido #{pedido.idPedido}</h1>

      <p>
        <strong>Atendente:</strong> {pedido.atendente}
      </p>

      <p>
        <strong>Data:</strong>{" "}
        {new Date(pedido.dataPedido).toLocaleString()}
      </p>

      <h2>Sorvetes</h2>

      <ul>
        {pedido.sorvetes.map((s, index) => (
          <li key={index}>
            {s.tamanho} — {s.sabores.join(", ")} — R$ {s.preco}
          </li>
        ))}
      </ul>

      <h3>Total: R$ {pedido.total}</h3>

      <button onClick={() => navigate("/pedidos")}>
        Voltar para pedidos
      </button>
    </div>
  );
}
