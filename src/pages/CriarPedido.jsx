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

  // =========================
  // STATES
  // =========================
  const [tamanhos, setTamanhos] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [tamanhoId, setTamanhoId] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  // carrinho de sorvetes
  const [sorvetes, setSorvetes] = useState([]);

  // =========================
  // LOAD INICIAL
  // =========================
  useEffect(() => {
    listarTamanhos().then(setTamanhos);
    listarSabores().then(setSabores);
  }, []);

  const imagens = {
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
  // ADICIONAR SORVETE
  // =========================
  function adicionarSorvete() {
    if (!tamanhoId || saboresSelecionados.length === 0) {
      alert("Selecione um tamanho e pelo menos um sabor");
      return;
    }

    setSorvetes((prev) => [
      ...prev,
      {
        tamanhoId,
        saboresIds: saboresSelecionados,
      },
    ]);

    // limpa seleção atual
    setTamanhoId(null);
    setSaboresSelecionados([]);
  }

  // =========================
  // REMOVER SORVETE
  // =========================
  function removerSorvete(index) {
    setSorvetes((prev) => prev.filter((_, i) => i !== index));
  }

  // =========================
  // FINALIZAR PEDIDO
  // =========================
  async function finalizarPedido() {
    if (sorvetes.length === 0) {
      alert("Adicione pelo menos um sorvete ao pedido");
      return;
    }

    const payload = {
      atendenteId: Number(atendenteId),
      sorvetes: sorvetes.map((s) => ({
        tamanhoId: Number(s.tamanhoId),
        saboresIds: s.saboresIds.map(Number),
      })),
    };

    try {
      await criarPedido(payload);
      navigate("/pedidos");
    } catch (e) {
      alert("Erro ao criar pedido");
    }
  }

  // =========================
  // RENDER
  // =========================
  return (
    <Box sx={{ maxWidth: 480, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Criar Pedido
      </Typography>

      <Typography gutterBottom>
        Atendente ID: {atendenteId}
      </Typography>

      {/* TAMANHOS */}
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

      {/* SABORES */}
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

      {/* ADICIONAR SORVETE */}
      <Button
        fullWidth
        sx={{ mt: 2 }}
        variant="outlined"
        color="warning"
        onClick={adicionarSorvete}
      >
        Adicionar Sorvete
      </Button>

      {/* LISTA (CARRINHO) */}
      {sorvetes.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Sorvetes do Pedido
          </Typography>

          {sorvetes.map((s, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                p: 1,
                border: "1px solid #444",
                borderRadius: 1,
              }}
            >
              <Typography>
                Tamanho #{s.tamanhoId} — Sabores {s.saboresIds.join(", ")}
              </Typography>

              <Button
                size="small"
                color="error"
                onClick={() => removerSorvete(index)}
              >
                X
              </Button>
            </Box>
          ))}
        </>
      )}

      {/* FINALIZAR */}
      <Button
        fullWidth
        variant="contained"
        color="warning"
        sx={{ mt: 3 }}
        disabled={sorvetes.length === 0}
        onClick={finalizarPedido}
      >
        Finalizar Pedido
      </Button>
    </Box>
  );
}
