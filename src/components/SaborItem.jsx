import React from "react";
import { Box, Typography } from "@mui/material";

export default function SaborItem({
  imagem,
  nome,
  preco,
  checked,
  onToggle
}) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px",
        borderRadius: "10px",
        marginBottom: "10px",
        cursor: "pointer",

        backgroundColor: "#ffffff",
        border: checked ? "2px solid #ff9800" : "1px solid #ddd",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        readOnly
        style={{ transform: "scale(1.2)" }}
      />

      <img
        src={imagem}
        alt={nome}
        width={32}
        height={32}
      />

      <Typography
        sx={{
          fontWeight: 600,
          color: "#222" // 👈 TEXTO VISÍVEL
        }}
      >
        {nome} (+ R$ {preco})
      </Typography>
    </Box>
  );
}
