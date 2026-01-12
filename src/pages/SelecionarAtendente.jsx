import React, { useEffect, useState } from "react";



import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";

export default function SelecionarAtendente() {
  const [atendentes, setAtendentes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/atendentes`)
      .then(res => res.json())
      .then(setAtendentes);
  }, []);

  return (
    <div className="container">
      <h1>Selecione o atendente</h1>

      <div className="actions">
        {atendentes.map(a => (
          <button key={a.id} onClick={() => navigate(`/criar/${a.id}`)}>
            {a.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
