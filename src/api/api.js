const BASE_URL = "https://sistema-sorveteria-production.up.railway.app";

// =========================
// AUTH
// =========================
export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login inválido");
  }

  return res.json(); // { token }
}

// =========================
// HEADER JWT (AUTOMÁTICO)
// =========================
function getAuthHeader() {
  const token = localStorage.getItem("token");

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
}

// =========================
// ATENDENTES
// =========================
export async function listarAtendentes() {
  const res = await fetch(`${BASE_URL}/atendentes`, {
    headers: getAuthHeader(),
  });

  if (!res.ok) throw new Error("Erro ao listar atendentes");
  return res.json();
}

// =========================
// TAMANHOS
// =========================
export async function listarTamanhos() {
  const res = await fetch(`${BASE_URL}/tamanhos`, {
    headers: getAuthHeader(),
  });

  if (!res.ok) throw new Error("Erro ao listar tamanhos");
  return res.json();
}

// =========================
// SABORES
// =========================
export async function listarSabores() {
  const res = await fetch(`${BASE_URL}/sabores`, {
    headers: getAuthHeader(),
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
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error("Erro ao criar pedido");
}

export async function listarPedidos() {
  const res = await fetch(`${BASE_URL}/pedidos`, {
    headers: getAuthHeader(),
  });

  if (!res.ok) throw new Error("Erro ao listar pedidos");
  return res.json();
}

export async function buscarPedidoDetalhe(id) {
  const res = await fetch(`${BASE_URL}/pedidos/${id}`, {
    headers: getAuthHeader(),
  });

  if (!res.ok) throw new Error("Erro ao buscar pedido");
  return res.json();
}

// =========================
// RELATÓRIOS
// =========================
export async function totalFaturado() {
  const res = await fetch(`${BASE_URL}/relatorios/total-faturado`, {
    headers: getAuthHeader(),
  });

  if (!res.ok) throw new Error("Erro ao buscar total faturado");
  return res.json();
}

export async function totalPorAtendente() {
  const res = await fetch(`${BASE_URL}/relatorios/por-atendente`, {
    headers: getAuthHeader(),
  });

  if (!res.ok) throw new Error("Erro ao buscar total por atendente");
  return res.json();
}

export async function saboresMaisVendidos() {
  const res = await fetch(`${BASE_URL}/relatorios/sabores-mais-vendidos`, {
    headers: getAuthHeader(),
  });

  if (!res.ok) throw new Error("Erro ao buscar sabores mais vendidos");
  return res.json();
}

export async function tamanhosMaisVendidos() {
  const res = await fetch(`${BASE_URL}/relatorios/tamanhos-mais-vendidos`, {
    headers: getAuthHeader(),
  });

  if (!res.ok) throw new Error("Erro ao buscar tamanhos mais vendidos");
  return res.json();
}
