import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SelecionarAtendente from "./pages/SelecionarAtendente";
import CriarPedido from "./pages/CriarPedido";
import ListarPedidos from "./pages/ListarPedidos";
import PedidoDetalhe from "./pages/PedidoDetalhe";
import Relatorios from "./pages/Relatorios";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelecionarAtendente />} />
        <Route path="/criar/:atendenteId" element={<CriarPedido />} />
        <Route path="/pedidos" element={<ListarPedidos />} />
        <Route path="/pedidos/:id" element={<PedidoDetalhe />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
