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
    status: 'Ingresso valido - ore 20:00<br><span style="font-size: 12px;">del giorno sabato 05 settembre</span>',
    pdf: 'pdf/biglietto2.pdf'
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
    status: 'Ingresso valido - ore 20:00<br><span style="font-size: 12px;">del giorno sabato 05 settembre</span>',
    pdf: 'pdf/biglietto1.pdf'
  }
];

const giftBox = document.getElementById('giftBox');
const ticketsContainer = document.getElementById('tickets');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close');
const bgAudio = document.getElementById('bgAudio');

giftBox.onclick = () => {
  // 1. Nasconde il pacco regalo
  giftBox.classList.add('hidden');

  // 2. Fa apparire la locandina di sfondo
  document.body.classList.add('has-poster');

  // 3. Fa partire immediatamente la canzone "Revolte" di Paul Kalkbrenner
  bgAudio.play().catch(err => {
    console.log("Riproduzione audio bloccata dal browser:", err);
  });

  // 4. Prepara i biglietti con il link di download PDF
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
        <div class="ticket-footer">
          <div class="ticket-number-bottom">TICKET #00${x.n}</div>
          <a href="${x.pdf}" download class="download-btn">Scarica qui PDF 📄</a>
        </div>
      </div>
    `;
    fragment.appendChild(ticketDiv);
  });

  ticketsContainer.appendChild(fragment);

  // 5. Attende 5 secondi prima di mostrare l'overlay ed i coriandoli
  setTimeout(() => {
    overlay.classList.add('show');
    createConfetti();
  }, 5000);
};

// Quando si clicca sulla ✕:
closeBtn.onclick = () => {
  // Hide overlay
  overlay.classList.remove('show');
  
  // Toglie la locandina
  document.body.classList.remove('has-poster');

  // Ferma e resetta l'audio
  bgAudio.pause();
  bgAudio.currentTime = 0;

  // Ritorna al pacco regalo iniziale
  giftBox.classList.remove('hidden');
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
