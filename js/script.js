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

  // 2. Mostra subito la locandina adattata alla schermata
  document.body.classList.add('has-poster');

  // 3. Prepara i biglietti nell'overlay
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
      <p style="font-size: 1.1rem; margin: 0.8rem 0;"><b>${x.name}</b></p>
      <p style="color: #666; font-size: 0.9rem; margin: 0;">Sigillo: ${x.sig}</p>
    `;
    fragment.appendChild(ticketDiv);
  });

  ticketsContainer.appendChild(fragment);

  // 4. Dopo 5 secondi esatti compaiono i biglietti
  setTimeout(() => {
    overlay.classList.add('show');
  }, 5000);
};

// Chiude l'overlay dei biglietti
closeBtn.onclick = () => {
  overlay.classList.remove('show');
};
