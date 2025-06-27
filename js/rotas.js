document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-rotas');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
      origem: e.target.origem.value,
      destino: e.target.destino.value,
      centros: e.target.centros.value.split(',').map(c => c.trim()),
      distancia: e.target.distancia.value,
      tempo_estimado: e.target.tempo.value,
    };

    const response = await fetch('https://sua-api.com/rotas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (response.ok) {
      alert('Rota cadastrada!');
    } else {
      alert('Erro ao cadastrar rota.');
    }
  });
});

async function listarRotas() {
  const origem = document.getElementById('filtro-origem').value;
  const destino = document.getElementById('filtro-destino').value;

  const response = await fetch('https://sua-api.com/rotas');
  const rotas = await response.json();

  const tabela = document.getElementById('tabela-rotas');
  tabela.innerHTML = '<tr><th>Origem</th><th>Destino</th><th>Distância</th><th>Tempo</th></tr>';

  rotas
    .filter(r => r.origem.includes(origem) && r.destino.includes(destino))
    .forEach(r => {
      tabela.innerHTML += `
        <tr>
          <td>${r.origem}</td>
          <td>${r.destino}</td>
          <td>${r.distancia} km</td>
          <td>${r.tempo_estimado} h</td>
        </tr>
      `;
    });
}
