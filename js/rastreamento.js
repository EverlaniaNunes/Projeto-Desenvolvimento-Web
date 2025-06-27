document.getElementById('form-rastreamento').addEventListener('submit', async (e) => {
  e.preventDefault();
  const codigo = e.target.codigo.value;

  const entregaRes = await fetch(`https://sua-api.com/entregas/${codigo}`);
  const entrega = await entregaRes.json();

  const historicoRes = await fetch(`https://sua-api.com/entregas/${codigo}/historico`);
  const historico = await historicoRes.json();

  const resultadoDiv = document.getElementById('resultado-rastreamento');
  resultadoDiv.innerHTML = `
    <p>Status atual: <strong>${entrega.status}</strong></p>
    <h4>Histórico:</h4>
    <ul>
      ${historico.map(h => `<li>${h.data} - ${h.status}</li>`).join('')}
    </ul>
  `;
});
