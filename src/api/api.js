const BASE_URL = "http://localhost:8080";

export async function getAtendentes() {
  return fetch(`${BASE_URL}/atendentes`).then(r => r.json());
}

export async function criarPedido(dados) {
  const r = await fetch(`${BASE_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  if (!r.ok) throw new Error("Erro ao criar pedido");
  return r.json();
}

export async function listarPedidos() {
  return fetch(`${BASE_URL}/pedidos`).then(r => r.json());
}
