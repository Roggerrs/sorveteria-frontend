import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listarTamanhos, listarSabores, criarPedido } from "../api/api.js";

import SaborItem from "../components/SaborItem";

import chocolateImg from "../assets/sabores/chocolate.png";
import morangoImg from "../assets/sabores/morango.png";
import baunilhaImg from "../assets/sabores/baunilha.png";

import TamanhoItem from "../components/TamanhoItem";
import sorveteImg from "../assets/tamanhos/sorvete.png";


export default function CriarPedido() {
  const { atendenteId } = useParams();
  const navigate = useNavigate();

  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  const [sorvetesDoPedido, setSorvetesDoPedido] = useState([]);
  const [total, setTotal] = useState(0);

  const [erro, setErro] = useState(null);
  const [erroApi, setErroApi] = useState(null);

  useEffect(() => {
    listarTamanhos().then(setTamanhos);
    listarSabores().then(setSabores);
  }, []);

  const imagemPorSabor = {
    Chocolate: chocolateImg,
    Morango: morangoImg,
    Baunilha: baunilhaImg,
  };

  function toggleSabor(id) {
    setSaboresSelecionados(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  }

  function adicionarSorvete() {
    if (!tamanhoId || saboresSelecionados.length === 0) {
      setErro("Selecione um tamanho e ao menos um sabor");
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
      preco: precoSorvete,
    };

    setSorvetesDoPedido(prev => [...prev, sorvete]);
    setTotal(prev => prev + precoSorvete);

    setTamanhoId(null);
    setSaboresSelecionados([]);
    setErro(null);
  }

  function removerSorvete(index) {
    const sorveteRemovido = sorvetesDoPedido[index];

    setSorvetesDoPedido(prev =>
      prev.filter((_, i) => i !== index)
    );

    setTotal(prev => prev - sorveteRemovido.preco);
  }

  function finalizarPedido() {
    if (sorvetesDoPedido.length === 0) return;

    const pedido = {
      atendenteId: Number(atendenteId),
      sorvetes: sorvetesDoPedido.map(s => ({
        tamanhoId: s.tamanho.id,
        saboresIds: s.sabores.map(sb => sb.id),
      })),
    };

    criarPedido(pedido)
      .then(() => {
        setErroApi(null);
        alert(`Pedido criado com sucesso! Total: R$ ${total}`);
        setSorvetesDoPedido([]);
        setTotal(0);
      })
      .catch(() => {
        setErroApi("Erro ao criar pedido. Verifique o servidor.");
      });
  }

  return (
    <div>
      <h1>Criar Pedido</h1>
      <p><strong>Atendente ID:</strong> {atendenteId}</p>

<h2>Tamanho</h2>

{tamanhos.map(t => (
  <TamanhoItem
    key={t.id}
    imagem={sorveteImg}
    nome={t.descricao}
    preco={t.precoTamanho}
    tamanho={
      t.descricao.toLowerCase().includes("pequeno")
        ? "pequeno"
        : t.descricao.toLowerCase().includes("médio")
        ? "medio"
        : "grande"
    }
    selected={tamanhoId === t.id}
    onSelect={() => setTamanhoId(t.id)}
  />
))}


      <h2>Sabores</h2>
      {sabores.map(s => (
        <SaborItem
          key={s.id}
          imagem={imagemPorSabor[s.nome]}
          nome={s.nome}
          preco={s.precoAdicional}
          checked={saboresSelecionados.includes(s.id)}
          onToggle={() => toggleSabor(s.id)}
        />
      ))}

      <br />

      <button onClick={adicionarSorvete}>
        Adicionar Sorvete
      </button>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <h2>Sorvetes do Pedido</h2>

      {sorvetesDoPedido.length === 0 && (
        <p>Nenhum sorvete adicionado</p>
      )}

      {sorvetesDoPedido.map((s, i) => (
        <div key={i} style={{ marginBottom: "6px" }}>
          <button onClick={() => removerSorvete(i)}>X</button>{" "}
          <strong>{s.tamanho.descricao}</strong> —{" "}
          {s.sabores.map(sb => sb.nome).join(", ")} — R$ {s.preco}
        </div>
      ))}

      <h3>Total: R$ {total}</h3>

      <button
        onClick={finalizarPedido}
        disabled={sorvetesDoPedido.length === 0}
      >
        Finalizar Pedido
      </button>

      {erroApi && <p style={{ color: "red" }}>{erroApi}</p>}

      <br /><br />

      <button onClick={() => navigate("/pedidos")}>
        Ver pedidos
      </button>
    </div>
  );
}
