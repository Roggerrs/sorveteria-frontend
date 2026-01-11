import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listarTamanhos, listarSabores, criarPedido } from "../api/api.js";

export default function CriarPedido() {
  const { atendenteId } = useParams();
  const navigate = useNavigate();

  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  const [sorvetesDoPedido, setSorvetesDoPedido] = useState([]);
  const [total, setTotal] = useState(0);

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

    const precoSabores = saboresEscolhidos.reduce(
      (acc, s) => acc + s.precoAdicional,
      0
    );

    const precoSorvete = tamanho.precoTamanho + precoSabores;

    const sorvete = {
      tamanho,
      sabores: saboresEscolhidos,
      preco: precoSorvete
    };

    setSorvetesDoPedido(prev => [...prev, sorvete]);
    setTotal(prev => prev + precoSorvete);

    setTamanhoId(null);
    setSaboresSelecionados([]);
  }

  // ✅ AQUI ESTÁ A MELHORIA
  function removerSorvete(index) {
    const sorveteRemovido = sorvetesDoPedido[index];

    setSorvetesDoPedido(prev =>
      prev.filter((_, i) => i !== index)
    );

    setTotal(prev => prev - sorveteRemovido.preco);
  }

  function finalizarPedido() {
    if (sorvetesDoPedido.length === 0) {
      alert("Adicione ao menos um sorvete");
      return;
    }

    const pedido = {
      atendenteId: Number(atendenteId),
      sorvetes: sorvetesDoPedido.map(s => ({
        tamanhoId: s.tamanho.id,
        saboresIds: s.sabores.map(sb => sb.id)
      }))
    };

    criarPedido(pedido)
      .then(() => {
        alert(`Pedido criado com sucesso! Total: R$ ${total}`);
        setSorvetesDoPedido([]);
        setTotal(0);
      })
      .catch(() => alert("Erro ao criar pedido"));
  }

  return (
    <div>
      <h1>Criar Pedido</h1>
      <p><strong>Atendente ID:</strong> {atendenteId}</p>

      <h2>Tamanho</h2>
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

      <h2>Sabores</h2>
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
      <button onClick={adicionarSorvete}>Adicionar Sorvete</button>

      <h2>Sorvetes do Pedido</h2>
      {sorvetesDoPedido.length === 0 && <p>Nenhum sorvete adicionado</p>}

      {sorvetesDoPedido.map((s, i) => (
        <div key={i}>
          <button
            onClick={() => removerSorvete(i)}
            style={{ marginRight: "8px" }}
          >
            X
          </button>
          <strong>{s.tamanho.descricao}</strong> —{" "}
          {s.sabores.map(sb => sb.nome).join(", ")} — R$ {s.preco}
        </div>
      ))}

      <h3>Total: R$ {total}</h3>

      <button onClick={finalizarPedido}>Finalizar Pedido</button>

      <br /><br />

      <button onClick={() => navigate("/pedidos")}>
        Ver pedidos
      </button>
    </div>
  );
}
