document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-entregas');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
      cliente_id: e.target.cliente.value,
      encomenda_id: e.target.encomenda.value,
      rota_id: e.target.rota.value,
      previsao_entrega: e.target.previsao.value
    };

    const response = await fetch('https://sua-api.com/entregas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (response.ok) {
      alert('Entrega cadastrada!');
    } else {
      alert('Erro ao cadastrar entrega.');
    }
  });
});

async function listarEntregas() {
  const filtroStatus = document.getElementById('filtro-status').value;

  const response = await fetch('https://sua-api.com/entregas');
  const entregas = await response.json();

  const tabela = document.getElementById('tabela-entregas');
  tabela.innerHTML = '<tr><th>Cliente</th><th>Status</th><th>Previsão</th></tr>';

  entregas
    .filter(e => e.status.includes(filtroStatus))
    .forEach(e => {
      tabela.innerHTML += `
        <tr>
          <td>${e.cliente_nome || e.cliente_id}</td>
          <td>${e.status}</td>
          <td>${e.previsao_entrega}</td>
        </tr>
      `;
    });
}
