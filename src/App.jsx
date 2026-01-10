import React, { useState } from "react";
import SelecionarAtendente from "./pages/SelecionarAtendente";
import CriarPedido from "./pages/CriarPedido";
import ListarPedidos from "./pages/ListarPedidos";

export default function App() {
  const [tela, setTela] = useState("selecionar"); 
  const [atendenteId, setAtendenteId] = useState(null);

  function selecionarAtendente(id) {
    setAtendenteId(id);
    setTela("criar");
  }

  function voltarParaCriar() {
    setTela("criar");
  }

  function irParaListagem() {
    setTela("listar");
  }

  return (
    <div style={{ padding: "20px" }}>
      {tela === "selecionar" && (
        <SelecionarAtendente onSelecionar={selecionarAtendente} />
      )}

      {tela === "criar" && (
        <>
          <CriarPedido atendenteId={atendenteId} />
          <br />
          <button onClick={irParaListagem}>Ver pedidos</button>
        </>
      )}

      {tela === "listar" && (
        <>
          <ListarPedidos />
          <br />
          <button onClick={voltarParaCriar}>Novo pedido</button>
        </>
      )}
    </div>
  );
}
