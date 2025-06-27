document.getElementById('form-clientes').addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    nome: e.target.nome.value,
    cpf: e.target.cpf.value,
    email: e.target.email.value,
    endereco: e.target.endereco.value,
  };

  const response = await fetch('https://sua-api.com/clientes', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(dados)
  });

  if (response.ok) {
    alert('Cliente cadastrado!');
  } else {
    alert('Erro ao cadastrar cliente.');
  }
});

async function listarClientes() {
  const nome = document.getElementById('filtro-nome').value;
  const cpf = document.getElementById('filtro-cpf').value;

  const response = await fetch('https://sua-api.com/clientes');
  const clientes = await response.json();

  const tabela = document.getElementById('tabela-clientes');
  tabela.innerHTML = '<tr><th>Nome</th><th>CPF</th><th>Email</th><th>Endereço</th></tr>';

  clientes
    .filter(c => c.nome.includes(nome) && c.cpf.includes(cpf))
    .forEach(cliente => {
      tabela.innerHTML += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.cpf}</td>
          <td>${cliente.email}</td>
          <td>${cliente.endereco}</td>
        </tr>
      `;
    });
}
