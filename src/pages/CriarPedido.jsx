import React, { useEffect, useState } from "react";
import {
  listarTamanhos,
  listarSabores,
  criarPedido
} from "../api/api";

export default function CriarPedido({ atendenteId }) {
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  const [sorvetes, setSorvetes] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    listarTamanhos().then(setTamanhos);
    listarSabores().then(setSabores);
  }, []);

  function toggleSabor(id) {
    setSaboresSelecionados(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  }

  function adicionarSorvete() {
    if (!tamanhoId || saboresSelecionados.length === 0) {
      alert("Selecione tamanho e sabores");
      return;
    }

    const tamanho = tamanhos.find(t => t.id === tamanhoId);
    const saboresEscolhidos = sabores.filter(s =>
      saboresSelecionados.includes(s.id)
    );

    setSorvetes(prev => [
      ...prev,
      {
        tamanhoId,
        tamanhoDescricao: tamanho.descricao,
        saboresIds: saboresSelecionados,
        saboresNomes: saboresEscolhidos.map(s => s.nome)
      }
    ]);

    setTamanhoId(null);
    setSaboresSelecionados([]);
  }

  async function finalizarPedido() {
    if (sorvetes.length === 0) {
      alert("Adicione pelo menos um sorvete");
      return;
    }

    const payload = {
      atendenteId,
      sorvetes: sorvetes.map(s => ({
        tamanhoId: s.tamanhoId,
        sabores: s.saboresIds
      }))
    };

    const response = await criarPedido(payload);
    setMensagem(`Pedido criado! Total: R$ ${response.valorTotal}`);
    setSorvetes([]);
  }

  return (
    <div>
      <h2>Criar Pedido</h2>

      <h3>Novo Sorvete</h3>

      <h4>Tamanho</h4>
      {tamanhos.map(t => (
        <label key={t.id}>
          <input
            type="radio"
            checked={tamanhoId === t.id}
            onChange={() => setTamanhoId(t.id)}
          />
          {t.descricao} (R$ {t.precoTamanho})
          <br />
        </label>
      ))}

      <h4>Sabores</h4>
      {sabores.map(s => (
        <label key={s.id}>
          <input
            type="checkbox"
            checked={saboresSelecionados.includes(s.id)}
            onChange={() => toggleSabor(s.id)}
          />
          {s.nome} (+ R$ {s.precoAdicional})
          <br />
        </label>
      ))}

      <button onClick={adicionarSorvete}>Adicionar Sorvete</button>

      <h3>Sorvetes do Pedido</h3>
      {sorvetes.length === 0 && <p>Nenhum sorvete adicionado</p>}

      <ul>
        {sorvetes.map((s, i) => (
          <li key={i}>
            <strong>{s.tamanhoDescricao}</strong><br />
            Sabores: {s.saboresNomes.join(", ")}
          </li>
        ))}
      </ul>

      <button onClick={finalizarPedido}>Finalizar Pedido</button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
