const BASE_URL = "http://localhost:8080";

/* ===================== ATENDENTE ===================== */
export async function listarAtendentes() {
  const r = await fetch(`${BASE_URL}/atendentes`);
  return r.json();
}

/* ===================== TAMANHO ===================== */
export async function listarTamanhos() {
  const r = await fetch(`${BASE_URL}/tamanhos`);
  return r.json();
}

/* ===================== SABOR ===================== */
export async function listarSabores() {
  const r = await fetch(`${BASE_URL}/sabores`);
  return r.json();
}

/* ===================== PEDIDOS ===================== */
export async function criarPedido(dados) {
  const r = await fetch(`${BASE_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!r.ok) {
    throw new Error("Erro ao criar pedido");
  }

  return r.json();
}

export async function listarPedidos() {
  const r = await fetch(`${BASE_URL}/pedidos`);
  return r.json();
}

/* 🔹 NOVO — DETALHE DO PEDIDO */
export async function buscarPedidoDetalhe(idPedido) {
  const r = await fetch(`${BASE_URL}/pedidos/${idPedido}`);

  if (!r.ok) {
    throw new Error("Erro ao buscar detalhe do pedido");
  }

  return r.json();
}
