const data = [
  { n: 1, name: 'Leonardo Berloco', sig: 'C7D08B35EFC306A7' },
  { n: 2, name: 'Federica Bongermino', sig: '84C892FF18CE6EC0' }
];

const giftBox = document.getElementById('giftBox');
const ticketsContainer = document.getElementById('tickets');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close');

giftBox.onclick = () => {
  // 1. Nasconde il pacco regalo
  giftBox.classList.add('hidden');

  // 2. Imposta la locandina come sfondo del body
  document.body.classList.add('has-poster');

  // 3. Genera il contenuto dei biglietti
  ticketsContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  data.forEach(x => {
    const ticketDiv = document.createElement('div');
    ticketDiv.className = 'ticket';
    ticketDiv.innerHTML = `
      <div class='head'>
        <h2>SONO Metropolitan Fest</h2>
        <strong>Biglietto #${x.n}</strong>
      </div>
      <p><b>${x.name}</b></p>
      <p>Sigillo: ${x.sig}</p>
    `;
    fragment.appendChild(ticketDiv);
  });

  ticketsContainer.appendChild(fragment);

  // 4. Attende 5 secondi (5000 ms) prima di mostrare i biglietti
  setTimeout(() => {
    overlay.classList.add('show');
  }, 5000);
};

// Pulsante per chiudere l'overlay
closeBtn.onclick = () => overlay.classList.remove('show');
