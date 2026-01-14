import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listarTamanhos, listarSabores, criarPedido } from "../api/api";

import { Button, Typography, Box } from "@mui/material";

import TamanhoItem from "../components/TamanhoItem";
import SaborItem from "../components/SaborItem";

import sorveteImg from "../assets/tamanhos/sorvete.png";
import chocolateImg from "../assets/sabores/chocolate.png";
import morangoImg from "../assets/sabores/morango.png";
import baunilhaImg from "../assets/sabores/baunilha.png";

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
    if (!tamanhoId || saboresSelecionados.length === 0) return;

    const tamanho = tamanhos.find(t => t.id === tamanhoId);
    const saboresEscolhidos = sabores.filter(s =>
      saboresSelecionados.includes(s.id)
    );

    const precoSabores = saboresEscolhidos.reduce(
      (acc, s) => acc + s.precoAdicional,
      0
    );

    const precoSorvete = tamanho.precoTamanho + precoSabores;

    setSorvetesDoPedido(prev => [
      ...prev,
      { tamanho, sabores: saboresEscolhidos, preco: precoSorvete }
    ]);

    setTotal(prev => prev + precoSorvete);
    setTamanhoId(null);
    setSaboresSelecionados([]);
  }

  function removerSorvete(index) {
    const removido = sorvetesDoPedido[index];
    setSorvetesDoPedido(prev => prev.filter((_, i) => i !== index));
    setTotal(prev => prev - removido.preco);
  }

  function finalizarPedido() {
    if (sorvetesDoPedido.length === 0) return;

    criarPedido({
      atendenteId: Number(atendenteId),
      sorvetes: sorvetesDoPedido.map(s => ({
        tamanhoId: s.tamanho.id,
        saboresIds: s.sabores.map(sb => sb.id),
      })),
    }).then(() => {
      navigate("/pedidos");
    });
  }

  return (
    <Box sx={{ maxWidth: 480, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" color="warning.main" gutterBottom>
        Criar Pedido
      </Typography>

      <Typography gutterBottom>
        Atendente: {atendenteId}
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Tamanho
      </Typography>

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

      <Typography variant="h6" sx={{ mt: 3 }}>
        Sabores
      </Typography>

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

      <Button
        fullWidth
        variant="contained"
        color="warning"
        sx={{ mt: 2 }}
        onClick={adicionarSorvete}
      >
        Adicionar Sorvete
      </Button>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Sorvetes do Pedido
      </Typography>

      {sorvetesDoPedido.length === 0 && (
        <Typography color="#bbb">
          Nenhum sorvete adicionado
        </Typography>
      )}

      {sorvetesDoPedido.map((s, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1,
            color: "#fff",
          }}
        >
          <span
            onClick={() => removerSorvete(i)}
            style={{
              cursor: "pointer",
              color: "#ff5252",
              fontWeight: "bold",
            }}
          >
            ❌
          </span>

          <span>
            {s.tamanho.descricao} —{" "}
            {s.sabores.map(sb => sb.nome).join(", ")} — R$ {s.preco}
          </span>
        </Box>
      ))}

      <Typography sx={{ mt: 2 }}>
        Total: R$ {total}
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="warning"
        sx={{ mt: 2 }}
        disabled={sorvetesDoPedido.length === 0}
        onClick={finalizarPedido}
      >
        Finalizar Pedido
      </Button>

      <Button
        fullWidth
        variant="outlined"
        color="warning"
        sx={{ mt: 2 }}
        onClick={() => navigate("/pedidos")}
      >
        Ver pedidos
      </Button>
    </Box>
  );
}
