import React, { useEffect, useState } from "react";


import {
  totalFaturado,
  totalPorAtendente,
  saboresMaisVendidos,
  tamanhosMaisVendidos,
} from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Relatorios() {
  const navigate = useNavigate();

  const [total, setTotal] = useState(null);
  const [porAtendente, setPorAtendente] = useState([]);
  const [sabores, setSabores] = useState([]);
  const [tamanhos, setTamanhos] = useState([]);

  useEffect(() => {
    async function carregar() {
      setTotal(await totalFaturado());
      setPorAtendente(await totalPorAtendente());
      setSabores(await saboresMaisVendidos());
      setTamanhos(await tamanhosMaisVendidos());
    }
    carregar();
  }, []);

  return (
    <div className="container">
      <h1>Relatórios</h1>

      {total && (
        <>
          <h2>Total Faturado</h2>
          <div className="card">R$ {total.total}</div>
        </>
      )}

      <h2>Total por Atendente</h2>
      {porAtendente.map((a, i) => (
        <div key={i} className="card">
          {a.atendente} — R$ {a.total}
        </div>
      ))}

      <h2>Sabores Mais Vendidos</h2>
      {sabores.map((s, i) => (
        <div key={i} className="card">
          {s.nome} — {s.total}
        </div>
      ))}

      <h2>Tamanhos Mais Vendidos</h2>
      {tamanhos.map((t, i) => (
        <div key={i} className="card">
          {t.descricao} — {t.total}
        </div>
      ))}

      <div className="actions">
        <button className="secondary" onClick={() => navigate("/pedidos")}>
          Voltar para pedidos
        </button>
      </div>
    </div>
  );
}
