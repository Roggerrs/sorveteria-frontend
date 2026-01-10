import React, { useEffect, useState } from "react";
import { listarPedidos } from "../api/api.js";

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    listarPedidos().then(setPedidos);
  }, []);

  return (
    <div>
      <h2>Lista de Pedidos</h2>

      <ul>
        {pedidos.map(p => (
          <li key={p.id}>
            <strong>Pedido #{p.id}</strong> — R$ {p.valorTotal}
            <br />
            <button onClick={() => setPedidoSelecionado(p)}>
              Ver detalhes
            </button>
          </li>
        ))}
      </ul>

      {/* MODAL */}
      {pedidoSelecionado && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Detalhes do Pedido #{pedidoSelecionado.id}</h3>

            <p><strong>Atendente:</strong> {pedidoSelecionado.nomeAtendente}</p>
            <p><strong>Tamanho:</strong> {pedidoSelecionado.tamanho}</p>
            <p><strong>Sabores:</strong> {pedidoSelecionado.sabores.join(", ")}</p>
            <p><strong>Valor total:</strong> R$ {pedidoSelecionado.valorTotal}</p>

            <button onClick={() => setPedidoSelecionado(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ESTILOS SIMPLES DO MODAL */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px"
};
