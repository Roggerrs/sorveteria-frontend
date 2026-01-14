import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

import SelecionarAtendente from "./pages/SelecionarAtendente";
import CriarPedido from "./pages/CriarPedido";
import ListarPedidos from "./pages/ListarPedidos";
import PedidoDetalhe from "./pages/PedidoDetalhe";
import Relatorios from "./pages/Relatorios"; // 🆕 IMPORT

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

          {/* Detalhe do pedido */}
          <Route path="/pedidos/:id" element={<PedidoDetalhe />} />

          {/* 🆕 RELATÓRIOS */}
          <Route path="/relatorios" element={<Relatorios />} />

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
function CriarPedidoWrapper() {
  const { atendenteId } = useParams();
  return <CriarPedido atendenteId={Number(atendenteId)} />;
}
