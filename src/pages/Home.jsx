import { useEffect, useState } from "react";
import {
  listarAtendentes,
  listarTamanhos,
  listarSabores,
} from "../api/api";

function Home() {
  const [atendentes, setAtendentes] = useState([]);
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setAtendentes(await listarAtendentes());
        setTamanhos(await listarTamanhos());
        setSabores(await listarSabores());
      } catch (e) {
        setErro(e.message);
      }
    }

    carregarDados();
  }, []);

  if (erro) {
    return <p style={{ color: "red" }}>Erro: {erro}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sorveteria</h1>

      <h2>Atendentes</h2>
      <ul>
        {atendentes.map(a => (
          <li key={a.id_atendente}>{a.nome}</li>
        ))}
      </ul>

      <h2>Tamanhos</h2>
      <ul>
        {tamanhos.map(t => (
          <li key={t.id_tamanho}>
            {t.descricao} — R$ {t.preco_tamanho}
          </li>
        ))}
      </ul>

      <h2>Sabores</h2>
      <ul>
        {sabores.map(s => (
          <li key={s.id_sabor}>
            {s.nome} — R$ {s.preco_adicional}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
