import React, { useEffect, useState } from "react";
import { listarAtendentes } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SelecionarAtendente() {
  const [atendentes, setAtendentes] = useState([]);
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    listarAtendentes()
      .then(setAtendentes)
      .catch(() => setErro(true));
  }, []);

  if (erro) {
    return <p style={{ color: "red" }}>Erro ao carregar atendentes</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Selecione o atendente</h2>

      {atendentes.map((a) => (
        <button
          key={a.id}
          onClick={() => navigate(`/criar/${a.id}`)}
          style={{ marginRight: "10px" }}
        >
          {a.nome}
        </button>
      ))}
    </div>
  );
}
