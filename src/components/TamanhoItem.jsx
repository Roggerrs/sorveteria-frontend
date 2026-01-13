import React from "react";
import { Box, Typography } from "@mui/material";

export default function TamanhoItem({
  imagem,
  nome,
  preco,
  selected,
  onSelect,
  tamanho // "pequeno" | "medio" | "grande"
}) {
  const tamanhoImagem =
    tamanho === "pequeno" ? 32 :
    tamanho === "medio"   ? 48 :
    64;

  return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px",
        borderRadius: "10px",
        marginBottom: "10px",
        cursor: "pointer",

        backgroundColor: "#ffffff",
        border: selected ? "2px solid #ff9800" : "1px solid #ddd",

        transition: "all 0.2s ease",
      }}
    >
      <input
        type="radio"
        checked={selected}
        readOnly
        style={{ transform: "scale(1.2)" }}
      />

      <img
        src={imagem}
        alt={nome}
        width={tamanhoImagem}
        height={tamanhoImagem}
      />

      <Typography
        sx={{
          fontWeight: 600,
          color: "#222", // 👈 TEXTO VISÍVEL
          fontSize: "1rem"
        }}
      >
        {nome} (R$ {preco})
      </Typography>
    </Box>
  );
}
