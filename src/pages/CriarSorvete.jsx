import { useEffect, useState } from "react";
import { listarTamanhos, listarSabores, criarPedido } from "../api/api";

export default function CriarSorvete() {
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState("");
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  // ⚠️ enquanto não existe login
  const atendenteId = 1;

  useEffect(() => {
    listarTamanhos().then(setTamanhos);
    listarSabores().then(setSabores);
  }, []);

  function toggleSabor(id) {
    setSaboresSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  }

  function salvarPedido() {
    if (!tamanhoId || saboresSelecionados.length === 0) {
      alert("Selecione o tamanho e pelo menos um sabor");
      return;
    }

    const pedido = {
      atendenteId: Number(atendenteId),
      tamanhoId: Number(tamanhoId),
      sabores: saboresSelecionados,
    };

    criarPedido(pedido)
      .then(() => {
        alert("Pedido criado com sucesso!");
        setSaboresSelecionados([]);
        setTamanhoId("");
      })
      .catch(() => alert("Erro ao criar pedido"));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Criar Sorvete</h2>

      <h3>Tamanho</h3>
      <select
        value={tamanhoId}
        onChange={(e) => setTamanhoId(e.target.value)}
      >
        <option value="">Selecione</option>
        {tamanhos.map((t) => (
          <option key={t.id} value={t.id}>
            {t.descricao} - R$ {t.precoTamanho}
          </option>
        ))}
      </select>

      <h3>Sabores</h3>
      {sabores.map((s) => (
        <div key={s.id}>
          <label>
            <input
              type="checkbox"
              checked={saboresSelecionados.includes(s.id)}
              onChange={() => toggleSabor(s.id)}
            />
            {s.nome}
          </label>
        </div>
      ))}

      <br />
      <button onClick={salvarPedido}>Finalizar Pedido</button>
    </div>
  );
}
