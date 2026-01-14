import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listarTamanhos,
  listarSabores,
  criarPedido,
} from "../api/api";

export default function CriarPedido({ atendenteId }) {
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);
  const [tamanhoId, setTamanhoId] = useState("");
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  const navigate = useNavigate();

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

  function finalizarPedido() {
    criarPedido({
      atendenteId,
      tamanhoId,
      sabores: saboresSelecionados,
    })
      .then(() => navigate("/pedidos"))
      .catch((err) => {
        alert("Erro ao criar pedido");
        console.error(err);
      });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Criar Pedido</h2>

      <select
        value={tamanhoId}
        onChange={(e) => setTamanhoId(e.target.value)}
      >
        <option value="">Selecione o tamanho</option>
        {tamanhos.map((t) => (
          <option key={t.id} value={t.id}>
            {t.descricao}
          </option>
        ))}
      </select>

      <h3>Sabores</h3>
      {sabores.map((s) => (
        <label key={s.id} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={saboresSelecionados.includes(s.id)}
            onChange={() => toggleSabor(s.id)}
          />
          {s.nome}
        </label>
      ))}

      <button onClick={finalizarPedido}>Finalizar</button>
    </div>
  );
}
