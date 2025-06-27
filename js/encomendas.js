document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-encomendas');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
      peso: e.target.peso.value,
      tipo: e.target.tipo.value,
      descricao: e.target.descricao.value,
      endereco_entrega: e.target.endereco.value,
    };

    const response = await fetch('https://sua-api.com/encomendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (response.ok) {
      alert('Encomenda cadastrada!');
    } else {
      alert('Erro ao cadastrar encomenda.');
    }
  });
});

async function listarEncomendas() {
  const tipo = document.getElementById('filtro-tipo').value;
  const peso = document.getElementById('filtro-peso').value;

  const response = await fetch('https://sua-api.com/encomendas');
  const encomendas = await response.json();

  const tabela = document.getElementById('tabela-encomendas');
  tabela.innerHTML = '<tr><th>Tipo</th><th>Peso</th><th>Descrição</th><th>Endereço</th></tr>';

  encomendas
    .filter(e => e.tipo.includes(tipo) && e.peso.toString().includes(peso))
    .forEach(e => {
      tabela.innerHTML += `
        <tr>
          <td>${e.tipo}</td>
          <td>${e.peso} kg</td>
          <td>${e.descricao}</td>
          <td>${e.endereco_entrega}</td>
        </tr>
      `;
    });
}
