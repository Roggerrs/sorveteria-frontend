const BASE_URL = "http://localhost:8080";

/* =========================
   ATENDENTES
========================= */
export async function listarAtendentes() {
  const res = await fetch(`${BASE_URL}/atendentes`);
  if (!res.ok) throw new Error("Erro ao buscar atendentes");
  return res.json();
}

/* =========================
   PEDIDOS
========================= */
export async function listarPedidos() {
  const res = await fetch(`${BASE_URL}/pedidos`);
  if (!res.ok) throw new Error("Erro ao buscar pedidos");
  return res.json();
}

export async function buscarPedidoPorId(id) {
  const res = await fetch(`${BASE_URL}/pedidos/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar pedido");
  return res.json();
}

export async function criarPedido(payload) {
  const res = await fetch(`${BASE_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Erro ao criar pedido");
  return res.json();
}
