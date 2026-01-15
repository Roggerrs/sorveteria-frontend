const BASE_URL = "https://sistema-sorveteria-production.up.railway.app";

// =========================
// ATENDENTES
// =========================
export async function listarAtendentes() {
  const res = await fetch(`${BASE_URL}/atendentes`, {
    headers: AUTH_HEADER,
  });
  if (!res.ok) throw new Error("Erro ao listar atendentes");
  return res.json();
}

// =========================
// TAMANHOS
// =========================
export async function listarTamanhos() {
  const res = await fetch(`${BASE_URL}/tamanhos`, {
    headers: AUTH_HEADER,
  });
  if (!res.ok) throw new Error("Erro ao listar tamanhos");
  return res.json();
}

// =========================
// SABORES
// =========================
export async function listarSabores() {
  const res = await fetch(`${BASE_URL}/sabores`, {
    headers: AUTH_HEADER,
  });
  if (!res.ok) throw new Error("Erro ao listar sabores");
  return res.json();
}

// =========================
// PEDIDOS
// =========================
export async function criarPedido(dados) {
  const res = await fetch(`${BASE_URL}/pedidos`, {
    method: "POST",
    headers: {
      ...AUTH_HEADER,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error("Erro ao criar pedido");
}

export async function listarPedidos() {
  const res = await fetch(`${BASE_URL}/pedidos`, {
    headers: AUTH_HEADER,
  });
  if (!res.ok) throw new Error("Erro ao listar pedidos");
  return res.json();
}

export async function buscarPedidoDetalhe(id) {
  const res = await fetch(`${BASE_URL}/pedidos/${id}`, {
    headers: AUTH_HEADER,
  });
  if (!res.ok) throw new Error("Erro ao buscar pedido");
  return res.json();
}

// =========================
// RELATÓRIOS
// =========================
export async function totalFaturado() {
  const res = await fetch(`${BASE_URL}/relatorios/total-faturado`, {
    headers: AUTH_HEADER,
  });
  if (!res.ok) throw new Error("Erro ao buscar total faturado");
  return res.json();
}

export async function totalPorAtendente() {
  const res = await fetch(`${BASE_URL}/relatorios/por-atendente`, {
    headers: AUTH_HEADER,
  });
  if (!res.ok) throw new Error("Erro ao buscar total por atendente");
  return res.json();
}

export async function saboresMaisVendidos() {
  const res = await fetch(`${BASE_URL}/relatorios/sabores-mais-vendidos`, {
    headers: AUTH_HEADER,
  });
  if (!res.ok) throw new Error("Erro ao buscar sabores mais vendidos");
  return res.json();
}

export async function tamanhosMaisVendidos() {
  const res = await fetch(`${BASE_URL}/relatorios/tamanhos-mais-vendidos`, {
    headers: AUTH_HEADER,
  });
  if (!res.ok) throw new Error("Erro ao buscar tamanhos mais vendidos");
  return res.json();
}
