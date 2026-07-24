const data = [
  { 
    n: 1, 
    name: 'Leonardo Berloco', 
    sig: 'C7D08B35EFC306A7',
    date: '05 SET',
    dayTime: 'Sabato / 20:00',
    title: 'SONO Metropolitan Fest 2026',
    location: '📍 FIERA DEL LEVANTE - ARENA DEL LEVANTE',
    tier: 'GA - TIER 1',
    status: 'Ingresso valido - ore 20:00<br><span style="font-size: 12px;">del giorno sabato 05 settembre</span>'
  },
  { 
    n: 2, 
    name: 'Federica Bongermino', 
    sig: '84C892FF18CE6EC0',
    date: '05 SET',
    dayTime: 'Sabato / 20:00',
    title: 'SONO Metropolitan Fest 2026',
    location: '📍 FIERA DEL LEVANTE - ARENA DEL LEVANTE',
    tier: 'GA - TIER 1',
    status: 'Ingresso valido - ore 20:00<br><span style="font-size: 12px;">del giorno sabato 05 settembre</span>'
  }
];

const giftBox = document.getElementById('giftBox');
const ticketsContainer = document.getElementById('tickets');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close');

giftBox.onclick = () => {
  // 1. Nasconde il regalo
  giftBox.classList.add('hidden');

  // 2. Mostra lo sfondo della locandina
  document.body.classList.add('has-poster');

  // 3. Genera il layout dei biglietti
  ticketsContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  data.forEach(x => {
    const ticketDiv = document.createElement('div');
    ticketDiv.className = 'ticket';
    ticketDiv.innerHTML = `
      <div class="ticket-header">
        <div class="ticket-header-left">
          <div class="ticket-date">${x.date}</div>
          <div class="ticket-date-small">${x.dayTime}</div>
          <div class="ticket-title">${x.title}</div>
          <div class="ticket-location">${x.location}</div>
        </div>
        <div class="ticket-number-top">
          BIGLIETTO<br>#${x.n}
        </div>
      </div>
      <div class="ticket-body">
        <div class="ticket-info-row">
          <div class="ticket-info-column">
            <div class="ticket-info-label">Nome</div>
            <div class="ticket-info-value">${x.name}</div>
          </div>
          <div class="ticket-info-column">
            <div class="ticket-info-label">Sigillo Fiscale</div>
            <div class="ticket-info-value">${x.sig}</div>
          </div>
        </div>
        <div class="ticket-info-row">
          <div class="ticket-info-column">
            <div class="ticket-info-label">Tipologia biglietto</div>
            <div class="ticket-info-value">${x.tier}</div>
          </div>
          <div class="ticket-info-column">
            <div class="ticket-info-label">Stato</div>
            <div class="ticket-info-value">${x.status}</div>
          </div>
        </div>
        <div class="ticket-info-row">
          <div class="ticket-number-bottom">TICKET #00${x.n}</div>
        </div>
      </div>
    `;
    fragment.appendChild(ticketDiv);
  });

  ticketsContainer.appendChild(fragment);

  // 4. Timer 5 secondi prima della comparsa dell'overlay con i biglietti
  setTimeout(() => {
    overlay.classList.add('show');
    createConfetti();
  }, 5000);
};

// Pulsante Chiudi
closeBtn.onclick = () => {
  overlay.classList.remove('show');
};

// Generazione Coriandoli
function createConfetti() {
  const emojis = ['🎉', '✨', '🎊', '🎵', '🎸', '🎤', '⚡', '💫'];
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    
    document.body.appendChild(confetti);
    
    const duration = Math.random() * 2.5 + 2;
    const horizontalMove = (Math.random() - 0.5) * 300;
    const rotation = Math.random() * 720;
    
    confetti.animate([
      { transform: `translateY(0px) translateX(0px) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(${window.innerHeight + 50}px) translateX(${horizontalMove}px) rotate(${rotation}deg)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      easing: 'ease-in'
    });
    
    setTimeout(() => confetti.remove(), duration * 1000);
  }
}
