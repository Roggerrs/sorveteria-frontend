import { useEffect, useState } from "react";
import {
  listarAtendentes,
  listarSabores,
  listarTamanhos
} from "../api/api";

export default function Home() {
  const [atendentes, setAtendentes] = useState([]);
  const [sabores, setSabores] = useState([]);
  const [tamanhos, setTamanhos] = useState([]);

  useEffect(() => {
    listarAtendentes().then(setAtendentes);
    listarSabores().then(setSabores);
    listarTamanhos().then(setTamanhos);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sistema de Sorveteria</h1>

      <p>🍦 Atendentes: {atendentes.length}</p>
      <p>🍨 Sabores: {sabores.length}</p>
      <p>📏 Tamanhos: {tamanhos.length}</p>
    </div>
  );
}
