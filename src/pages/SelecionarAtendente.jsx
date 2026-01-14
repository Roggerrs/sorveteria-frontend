import React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarAtendentes } from "../api/api";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";

export default function SelecionarAtendente() {
  const [atendentes, setAtendentes] = useState([]);
  const [atendenteId, setAtendenteId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    listarAtendentes().then(setAtendentes);
  }, []);

  function continuar() {
    if (!atendenteId) {
      alert("Selecione um atendente");
      return;
    }
    navigate(`/criar-pedido/${atendenteId}`);
  }

  return (
    <Box sx={{ maxWidth: 400, margin: "100px auto" }}>
      <Typography variant="h5" gutterBottom>
        Selecione o atendente
      </Typography>

      <Select
        fullWidth
        value={atendenteId}
        onChange={(e) => setAtendenteId(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">
          <em>Selecione...</em>
        </MenuItem>

        {atendentes.map((a) => (
          <MenuItem key={a.id} value={a.id}>
            {a.nome}
          </MenuItem>
        ))}
      </Select>

      <Button
        fullWidth
        variant="contained"
        color="warning"
        sx={{ mt: 2 }}
        onClick={continuar}
      >
        Continuar
      </Button>
    </Box>
  );
}
