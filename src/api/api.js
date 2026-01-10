const BASE_URL = "http://localhost:8080";

export async function getAtendentes() {
  const r = await fetch(`${BASE_URL}/atendentes`);
  return r.json();
}

export async function getTamanhos() {
  const r = await fetch(`${BASE_URL}/tamanhos`);
  return r.json();
}

export async function getSabores() {
  const r = await fetch(`${BASE_URL}/sabores`);
  return r.json();
}

export async function criarPedido(dados) {
  const r = await fetch(`${BASE_URL}/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
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
