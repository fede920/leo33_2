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
    status: 'Ingresso valido - ore 20:00<br><span style="font-size: 11px;">del giorno sabato 05 settembre</span>',
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
    status: 'Ingresso valido - ore 20:00<br><span style="font-size: 11px;">del giorno sabato 05 settembre</span>',
    pdf: 'pdf/biglietto1.pdf'
  }
];

const giftBox = document.getElementById('giftBox');
const ticketsContainer = document.getElementById('tickets');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close');
const bgAudio = document.getElementById('bgAudio');

// Gestione avviamento audio sbloccato
function startAudio() {
  if (bgAudio) {
    bgAudio.volume = 0.8;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("Audio avviato con successo!");
      }).catch(err => {
        console.log("Audio in attesa di interazione dell'utente:", err);
      });
    }
  }
}

giftBox.onclick = () => {
  // 1. Tenta di avviare l'audio
  startAudio();

  // 2. Nasconde il pacco regalo
  giftBox.classList.add('hidden');

  // 3. Mostra la locandina
  document.body.classList.add('has-poster');

  // 4. Inserisce i biglietti
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
        <div>
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

  // 5. Mostra l'overlay con i biglietti dopo 5 secondi
  setTimeout(() => {
    overlay.classList.add('show');
    createConfetti();
  }, 5000);
};

// Tasto Chiudi (✕)
closeBtn.onclick = (e) => {
  e.preventDefault();
  e.stopPropagation();

  // Nasconde overlay
  overlay.classList.remove('show');
  
  // Rimuove locandina
  document.body.classList.remove('has-poster');

  // Stoppa audio
  if (bgAudio) {
    bgAudio.pause();
    bgAudio.currentTime = 0;
  }

  // Torna al pacco regalo
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
