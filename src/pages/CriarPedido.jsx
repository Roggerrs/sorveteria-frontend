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

  // =========================
  // STATE
  // =========================
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);
  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  // =========================
  // LOAD INICIAL
  // =========================
  useEffect(() => {
    listarTamanhos().then(setTamanhos);
    listarSabores().then(setSabores);
  }, []);

  // =========================
  // IMAGENS POR SABOR
  // =========================
  const imagemPorSabor = {
    Chocolate: chocolateImg,
    Morango: morangoImg,
    Baunilha: baunilhaImg,
  };

  // =========================
  // TOGGLE SABOR
  // =========================
  function toggleSabor(id) {
    setSaboresSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  }

  // =========================
  // FINALIZAR PEDIDO
  // =========================
  async function finalizarPedido() {
    if (!tamanhoId || saboresSelecionados.length === 0) {
      alert("Selecione um tamanho e pelo menos um sabor");
      return;
    }

    const payload = {
      atendenteId: Number(atendenteId),
      sorvetes: [
        {
          tamanhoId: Number(tamanhoId),
          saboresIds: saboresSelecionados.map((id) => Number(id)),
        },
      ],
    };

    try {
      await criarPedido(payload);
      alert("Pedido criado com sucesso!");
      navigate("/pedidos");
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      alert("Erro ao criar pedido");
    }
  }

  // =========================
  // RENDER
  // =========================
  return (
    <Box sx={{ maxWidth: 480, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" color="warning.main" gutterBottom>
        Criar Pedido
      </Typography>

      <Typography gutterBottom>
        Atendente: {atendenteId}
      </Typography>

      {/* ========================= */}
      {/* TAMANHOS */}
      {/* ========================= */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Tamanho
      </Typography>

      {tamanhos.map((t) => (
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

      {/* ========================= */}
      {/* SABORES */}
      {/* ========================= */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Sabores
      </Typography>

      {sabores.map((s) => (
        <SaborItem
          key={s.id}
          imagem={imagemPorSabor[s.nome]}
          nome={s.nome}
          preco={s.precoAdicional}
          checked={saboresSelecionados.includes(s.id)}
          onToggle={() => toggleSabor(s.id)}
        />
      ))}

      {/* ========================= */}
      {/* FINALIZAR */}
      {/* ========================= */}
      <Button
        fullWidth
        variant="contained"
        color="warning"
        sx={{ mt: 3 }}
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
