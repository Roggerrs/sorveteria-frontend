import { useEffect, useState } from "react";
import {
  listarAtendentes,
  listarSabores,
  listarTamanhos,
} from "../api/api";

export default function Home() {
  const [atendentes, setAtendentes] = useState([]);
  const [sabores, setSabores] = useState([]);
  const [tamanhos, setTamanhos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    Promise.all([
      listarAtendentes(),
      listarSabores(),
      listarTamanhos(),
    ])
      .then(([a, s, t]) => {
        setAtendentes(a);
        setSabores(s);
        setTamanhos(t);
      })
      .catch(() => setErro("Erro ao carregar dados"));
  }, []);

  if (erro) return <p>{erro}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sistema de Sorveteria</h1>

      <p>👨‍🍳 Atendentes: {atendentes.length}</p>
      <p>🍨 Sabores: {sabores.length}</p>
      <p>📏 Tamanhos: {tamanhos.length}</p>
    </div>
  );
}
