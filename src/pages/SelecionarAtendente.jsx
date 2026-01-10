import { useEffect, useState } from "react";
import { listarAtendentes } from "../api/api";

export default function SelecionarAtendente({ onSelecionar }) {
  const [atendentes, setAtendentes] = useState([]);

  useEffect(() => {
    listarAtendentes()
      .then(setAtendentes)
      .catch(() => alert("Erro ao carregar atendentes"));
  }, []);

  return (
    <div>
      <h2>Selecione o atendente</h2>

      {atendentes.map((a) => (
        <button key={a.id} onClick={() => onSelecionar(a.id)}>
          {a.nome}
        </button>
      ))}
    </div>
  );
}
