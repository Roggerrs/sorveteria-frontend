const BASE_URL = "http://localhost:8080";

async function safeJson(response) {
  if (!response.ok) {
    return [];
  }

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

export async function getAtendentes() {
  const r = await fetch(`${BASE_URL}/atendentes`);
  return safeJson(r);
}

export async function getTamanhos() {
  const r = await fetch(`${BASE_URL}/tamanhos`);
  return safeJson(r);
}

export async function getSabores() {
  const r = await fetch(`${BASE_URL}/sabores`);
  return safeJson(r);
}

export async function criarPedido(dados) {
  const r = await fetch(`${BASE_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  if (!r.ok) {
    throw new Error("Erro ao criar pedido");
  }

  return r.json(); // backend retorna pedido + total
}

export async function listarPedidos() {
  const r = await fetch(`${BASE_URL}/pedidos`);
  return safeJson(r);
}
