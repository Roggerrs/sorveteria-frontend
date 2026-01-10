import React, { useEffect, useState } from "react";
import { getAtendentes } from "../api/api.js";

export default function SelecionarAtendente({ onSelecionar }) {
  const [atendentes, setAtendentes] = useState([]);

  useEffect(() => {
    getAtendentes().then(setAtendentes);
  }, []);

  return (
    <div>
      <h2>Selecione o atendente</h2>
      {atendentes.map(a => (
        <button key={a.id} onClick={() => onSelecionar(a.id)}>
          {a.nome}
        </button>
      ))}
    </div>
  );
}
