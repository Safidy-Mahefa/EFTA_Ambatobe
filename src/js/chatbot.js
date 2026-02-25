const chatbotToggle = document.getElementById('chatbot-toggle'); //le bouton pour ouvrir chatbot
const chatbotPanel = document.getElementById('chatbot-panel'); //le conteneur principal
const chatbotClose = document.getElementById('chatbotClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatIcon = document.getElementById('chatIcon');

//initialiser les réponses du bot 
const botResponses = {
      admission: "Pour candidater à l'EFTA Ambatobe, vous devez:<br> ①&nbsp;Avoir un Bac A2, C, D ou S (18-25 ans, célibataire)<br> ②&nbsp;Constituer votre dossier (acte de naissance, résidence, Bac)<br> ③&nbsp;Envoyer un mandat poste de 20&nbsp;000 Ar<br> ④&nbsp;Passer le concours national.<br> 👉 Voir la <a href='#admission' style='color:var(--vert-clair)'>section Admission</a>",
      formations: "L'EFTA propose 2 formations : <br>🎓 <strong>BTSA</strong> (2 ans, Bac+2) en Agriculture, Élevage, Pêche et <br><strong>Certificat AC/AE</strong> (1 an) en Agriculture de Conservation. 👉 <a href='#formations' style='color:var(--vert-clair)'>Voir les formations</a>",
      bac: "Les baccalauréats acceptés sont : <br>✅ A2, C, D, S <br>✅ Baccalauréat Agricole <br>✅ DTA (Diplôme de Technicien Agricole). Les autres séries ne permettent pas l'accès au concours.",
      duree: "🎓 BTSA : <strong>2 ans</strong> (Formation Initiale, Bac+2)<br>🌿 Certificat AC/AE : <strong>1 an</strong> (Spécialisation)<br>Les formations incluent des stages obligatoires sur le terrain.",
      debouches: "Avec un diplôme EFTA, vous pouvez devenir : <br>🏛️ Technicien agricole d'État (MAEP) <br>· 🌿 Conseiller agro-écologie (ONG) <br>· 🚜 Chef d'exploitation <br>· 📊 Agent suivi-évaluation. Taux d'insertion : ~78%<br>. 👉 <a href='#debouches' style='color:var(--vert-clair)'>Voir les débouchés</a>",
      contact: "📍 EFTA Ambatobe, Antananarivo-Nord<br>📞 [TELEPHONE]<br>📧 [EMAIL_CONTACT]<br>🕐 Lun-Ven : 8h-17h<br>👉 <a href='#contact' style='color:var(--vert-clair)'>Formulaire de contact</a>",
      default: "Merci pour votre question ! Pour une réponse personnalisée, je vous invite à 👉 <a href='#contact' style='color:var(--vert-clair)'>contacter directement l'EFTA</a> ou à consulter notre <a href='#faq' style='color:var(--vert-clair)'>FAQ</a>. Notre équipe vous répondra dans les meilleurs délais. 😊"
};

//fonction pour ajouter une réponse venant du bot
function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.innerHTML = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

//fonction pour sumuler le typing
function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

//pour supprimer le typing
function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
}

//réponse du bot :
function botReply(key) {
    showTyping();
    setTimeout(() => {
        removeTyping();
        addMessage(botResponses[key] || botResponses.default, 'bot');
    }, 900 + Math.random() * 400);
}

//pour deviner le sujet relié au texte fourni
function matchIntent(text) {
    text = text.toLowerCase();
    if (/candid|inscri|doss|concours|comment/.test(text)) return 'admission';
    if (/form|btsa|cert|ac.ae|cours/.test(text)) return 'formations';
    if (/bac|série|diplôme|requis/.test(text)) return 'bac';
    if (/durée|combien|temps|années/.test(text)) return 'duree';
    if (/débouché|emploi|métier|travail|insertion/.test(text)) return 'debouches';
    if (/contact|adresse|téléphone|email|joindre/.test(text)) return 'contact';
    return 'default';
}

// QAND on clique sur un bouton quick reply
document.querySelectorAll('.quick-reply').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.q;
        const labels = {admission:'Comment candidater ?',formations:'Nos formations',bac:'Bacs acceptés ?',duree:'Durée des études',debouches:'Débouchés',contact:'Nous contacter'};
        addMessage(labels[key] || btn.textContent, 'user');
        botReply(key);
      });
});

//fonction por envoyer le message au chatbot
function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user'); //afficher le message
    chatInput.value = '';
    botReply(matchIntent(text));
}

//QUAND on clique sur le bouton envoyer ou ENTER,
chatSend.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChatMessage(); });

//QUAND on clique sur le bouton pour ouvrir le chat
chatbotToggle.addEventListener('click', () => {
    const open = chatbotPanel.classList.toggle('open');
    chatbotToggle.setAttribute('aria-expanded', open);
    chatIcon.className = open ? 'fas fa-times' : 'fas fa-comments';
    document.querySelector('.chat-notif-dot').style.display = open ? 'none' : 'block';
});
//QUAND on ferme
chatbotClose.addEventListener('click', () => {
    chatbotPanel.classList.remove('open');
    chatbotToggle.setAttribute('aria-expanded', false);
    chatIcon.className = 'fas fa-comments';
});