import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SelecionarAtendente from "./pages/SelecionarAtendente";
import CriarPedido from "./pages/CriarPedido";
import ListarPedidos from "./pages/ListarPedidos";
import PedidoDetalhe from "./pages/PedidoDetalhe";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Tela inicial */}
          <Route path="/" element={<SelecionarAtendente />} />

          {/* Criar pedido */}
          <Route
            path="/criar/:atendenteId"
            element={<CriarPedidoWrapper />}
          />

          {/* Listagem */}
          <Route path="/pedidos" element={<ListarPedidos />} />

          {/* 🔥 DETALHE DO PEDIDO (MELHORIA AQUI) */}
          <Route path="/pedidos/:id" element={<PedidoDetalhe />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

/* ============================= */
/* Wrapper para pegar atendente */
/* ============================= */
import { useParams } from "react-router-dom";

function CriarPedidoWrapper() {
  const { atendenteId } = useParams();
  return <CriarPedido atendenteId={Number(atendenteId)} />;
}
