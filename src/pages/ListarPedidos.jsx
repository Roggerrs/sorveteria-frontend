import { useEffect, useState } from "react";
import { listarPedidos, buscarPedidoPorId } from "../api/api";

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    try {
      const dados = await listarPedidos();
      setPedidos(dados);
    } catch {
      alert("Erro ao carregar pedidos");
    }
  }

  async function verDetalhes(id) {
    try {
      const detalhe = await buscarPedidoPorId(id);
      setPedidoSelecionado(detalhe);
    } catch {
      alert("Erro ao carregar detalhes do pedido");
    }
  }

  return (
    <div>
      <h2>Lista de Pedidos</h2>

      {pedidos.length === 0 && <p>Nenhum pedido encontrado</p>}

      <ul>
        {pedidos.map((p) => (
          <li key={p.id}>
            <strong>Pedido #{p.id}</strong> — R$ {p.valorTotal}
            <br />
            <button onClick={() => verDetalhes(p.id)}>
              Ver detalhes
            </button>
          </li>
        ))}
      </ul>

      {pedidoSelecionado && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Pedido #{pedidoSelecionado.id}</h3>
            <p><strong>Atendente:</strong> {pedidoSelecionado.atendente}</p>
            <p><strong>Total:</strong> R$ {pedidoSelecionado.total}</p>

            <h4>Sorvetes</h4>
            <ul>
              {pedidoSelecionado.sorvetes.map((s, i) => (
                <li key={i}>
                  {s.tamanho} — Sabores: {s.sabores.join(", ")} — R$ {s.precoTotal}
                </li>
              ))}
            </ul>

            <button onClick={() => setPedidoSelecionado(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
};

const modalStyle = {
  background: "#fff",
  padding: 20,
  margin: "50px auto",
  width: 400,
};
