import React, { useEffect, useState } from "react";
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

  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);
  const [sorvetes, setSorvetes] = useState([]);

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
    setSaboresSelecionados(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  }

  function adicionarSorvete() {
    if (!tamanhoId || saboresSelecionados.length === 0) {
      alert("Selecione um tamanho e pelo menos um sabor");
      return;
    }

    setSorvetes(prev => [
      ...prev,
      {
        tamanhoId,
        saboresIds: saboresSelecionados,
      },
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
      atendenteId: Number(atendenteId),
      sorvetes: sorvetes.map(s => ({
        tamanhoId: Number(s.tamanhoId),
        saboresIds: s.saboresIds.map(Number),
      })),
    };

    try {
      await criarPedido(payload);
      alert("Pedido criado com sucesso!");
      navigate("/pedidos");
    } catch (e) {
      console.error(e);
      alert("Erro ao criar pedido");
    }
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
          imagem={imagens[s.nome]}
          nome={s.nome}
          preco={s.precoAdicional}
          checked={saboresSelecionados.includes(s.id)}
          onToggle={() => toggleSabor(s.id)}
        />
      ))}

      <Button fullWidth sx={{ mt: 2 }} onClick={adicionarSorvete}>
        Adicionar Sorvete
      </Button>

      <Button
        fullWidth
        variant="contained"
        color="warning"
        sx={{ mt: 2 }}
        disabled={sorvetes.length === 0}
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
