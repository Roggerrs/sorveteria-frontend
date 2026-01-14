import React from "react";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listarTamanhos, listarSabores, criarPedido } from "../api/api";
import { Box, Typography, Button } from "@mui/material";

import TamanhoItem from "../components/TamanhoItem";
import SaborItem from "../components/SaborItem";

import sorveteImg from "../assets/tamanhos/sorvete.png";
import chocolateImg from "../assets/sabores/chocolate.png";
import morangoImg from "../assets/sabores/morango.png";
import baunilhaImg from "../assets/sabores/baunilha.png";

export default function CriarPedido() {
  const { atendenteId } = useParams();
  const navigate = useNavigate();

  if (!atendenteId) {
    return <p>Atendente não selecionado</p>;
  }

  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);
  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  useEffect(() => {
    listarTamanhos().then(setTamanhos);
    listarSabores().then(setSabores);
  }, []);

  const imagens = {
    Chocolate: chocolateImg,
    Morango: morangoImg,
    Baunilha: baunilhaImg,
  };

  function toggleSabor(id) {
    setSaboresSelecionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function finalizarPedido() {
    if (!tamanhoId || saboresSelecionados.length === 0) {
      alert("Selecione tamanho e sabores");
      return;
    }

    const payload = {
      atendenteId: Number(atendenteId),
      sorvetes: [
        {
          tamanhoId: Number(tamanhoId),
          saboresIds: saboresSelecionados.map(Number),
        },
      ],
    };

    try {
      await criarPedido(payload);
      navigate("/pedidos");
    } catch (e) {
      alert("Erro ao criar pedido");
    }
  }

  return (
    <Box sx={{ maxWidth: 480, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Criar Pedido
      </Typography>

      <Typography gutterBottom>
        Atendente ID: {atendenteId}
      </Typography>

      <Typography variant="h6">Tamanho</Typography>
      {tamanhos.map((t) => (
        <TamanhoItem
          key={t.id}
          imagem={sorveteImg}
          nome={t.descricao}
          preco={t.precoTamanho}
          selected={tamanhoId === t.id}
          onSelect={() => setTamanhoId(t.id)}
        />
      ))}

      <Typography variant="h6" sx={{ mt: 2 }}>
        Sabores
      </Typography>

      {sabores.map((s) => (
        <SaborItem
          key={s.id}
          imagem={imagens[s.nome]}
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
        sx={{ mt: 3 }}
        onClick={finalizarPedido}
      >
        Finalizar Pedido
      </Button>
    </Box>
  );
}
