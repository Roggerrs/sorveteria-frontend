import React, { useEffect, useState } from "react";
import { getTamanhos, getSabores } from "../api/api.js";

export default function CriarSorvete({ onAdicionar }) {
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  useEffect(() => {
    getTamanhos().then(setTamanhos);
    getSabores().then(setSabores);
  }, []);

  function toggleSabor(id) {
    if (saboresSelecionados.includes(id)) {
      setSaboresSelecionados(
        saboresSelecionados.filter(s => s !== id)
      );
    } else {
      setSaboresSelecionados([...saboresSelecionados, id]);
    }
  }

  function adicionarSorvete() {
  if (!tamanhoId) {
    alert("Selecione um tamanho");
    return;
  }

  const tamanho = tamanhos.find(t => t.id === tamanhoId);
  const saboresObj = sabores.filter(s => saboresSelecionados.includes(s.id));

  const sorvete = {
    tamanhoId,
    tamanhoDescricao: tamanho.descricao,
    saboresIds: saboresSelecionados,
    saboresNomes: saboresObj.map(s => s.nome)
  };

  onAdicionar(sorvete);

  setTamanhoId(null);
  setSaboresSelecionados([]);
}


  return (
    <div>
      <h3>Montar Sorvete</h3>

      <h4>Tamanho</h4>
      {tamanhos.map(t => (
        <div key={t.id}>
          <label>
            <input
              type="radio"
              name="tamanho"
              checked={tamanhoId === t.id}
              onChange={() => setTamanhoId(t.id)}
            />
            {t.descricao} (R$ {t.precoTamanho})
          </label>
        </div>
      ))}

      <h4>Sabores</h4>
      {sabores.map(s => (
        <div key={s.id}>
          <label>
            <input
              type="checkbox"
              checked={saboresSelecionados.includes(s.id)}
              onChange={() => toggleSabor(s.id)}
            />
            {s.nome} (+ R$ {s.precoAdicional})
          </label>
        </div>
      ))}

      <br />

      <button onClick={adicionarSorvete}>
        Adicionar Sorvete
      </button>
    </div>
  );
}
