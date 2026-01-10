import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080";

export default function SelecionarAtendente({ onSelecionar }) {
  const [atendentes, setAtendentes] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/atendentes`)
      .then(res => res.json())
      .then(setAtendentes);
  }, []);

  return (
    <div>
      <h1>Selecione o atendente</h1>

      {atendentes.map(a => (
        <button
          key={a.id}
          style={{ marginRight: 10, padding: "10px 20px" }}
          onClick={() => onSelecionar(a.id)}
        >
          {a.nome}
        </button>
      ))}
    </div>
  );
}
