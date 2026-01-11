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
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        setTotal(await totalFaturado());
        setPorAtendente(await totalPorAtendente());
        setSabores(await saboresMaisVendidos());
        setTamanhos(await tamanhosMaisVendidos());
      } catch (e) {
        setErro("Erro ao carregar relatórios");
      }
    }

    carregar();
  }, []);

  return (
    <div>
      <h1>Relatórios</h1>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {total && (
        <>
          <h2>Total Faturado</h2>
          <p><strong>R$ {total.total}</strong></p>
        </>
      )}

      <h2>Total por Atendente</h2>
      <ul>
        {porAtendente.map((a, i) => (
          <li key={i}>
            {a.atendente} — R$ {a.total}
          </li>
        ))}
      </ul>

      <h2>Sabores Mais Vendidos</h2>
      <ul>
        {sabores.map((s, i) => (
          <li key={i}>
            {s.nome} — {s.total}
          </li>
        ))}
      </ul>

      <h2>Tamanhos Mais Vendidos</h2>
      <ul>
        {tamanhos.map((t, i) => (
          <li key={i}>
            {t.descricao} — {t.total}
          </li>
        ))}
      </ul>

      <br />
      <button onClick={() => navigate("/pedidos")}>
        Voltar para pedidos
      </button>
    </div>
  );
}
