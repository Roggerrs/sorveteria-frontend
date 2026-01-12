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
        gap: "16px",
        padding: "14px",
        borderRadius: "10px",
        marginBottom: "12px",
        cursor: "pointer",

        backgroundColor: checked ? "#fff3e0" : "#ffffff",
        border: checked ? "2px solid #ff9800" : "1px solid #ddd",

        transition: "all 0.2s ease",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        readOnly
        style={{ transform: "scale(1.4)" }}
      />

      <img
        src={imagem}
        alt={nome}
        width={48}
        height={48}
      />

      <Typography
        sx={{
          color: "#222",          // 🔹 COR ESCURA (resolve o problema)
          fontWeight: 600,        // 🔹 MAIS LEGÍVEL
          fontSize: "1.1rem"
        }}
      >
        {nome} (+ R$ {preco})
      </Typography>
    </Box>
  );
}
