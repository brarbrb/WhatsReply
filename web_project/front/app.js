// WhatsAssist - simple front interactions
const privateList = [
  { id: 'p1', name: 'Dana Levi', unread: 3, last: 'You coming tonight?' },
  { id: 'p2', name: 'Itamar', unread: 1, last: 'Bro send me the file' },
  { id: 'p3', name: 'Noa', unread: 2, last: 'תזכור להביא את הכבל' },
];

const groupList = [
  { id: 'g1', name: 'Course Team', unread: 6, last: 'Standup in 10' },
  { id: 'g2', name: 'Family', unread: 2, last: 'Dinner Friday?' },
];

const SUGGESTIONS = {
  p1: [
    "Sounds good - I’ll be there around 8.",
    "Yep, on my way. Need me to bring anything?",
    "Free after 7 - want me to book a spot?"
  ],
  p2: [
    "Sent just now - check your email.",
    "I’ll push to Git in 5 minutes.",
    "On it - finishing a quick fix and sending."
  ],
  p3: [
    "סבבה - אזכיר לעצמי להביא מחר.",
    "מעולה, אדאג לזה היום בערב.",
    "אין בעיה, רשמתי לעצמי."
  ],
  g1: [
    "On it - I’ll share updates in the doc after the standup.",
    "Got it. I’ll take the ETL task.",
    "Cool - pushing the latest dashboard now."
  ],
  g2: [
    "Sounds great - I can bring a salad.",
    "I’m in. Any preferences for dessert?",
    "Let’s do 19:30 - works for me."
  ]
};

function el(tag, cls){ const e = document.createElement(tag); if(cls) e.className = cls; return e; }

function mountLists(){
  const pRoot = document.getElementById('privateList');
  const gRoot = document.getElementById('groupList');

  if(pRoot){
    privateList.forEach(c => pRoot.appendChild(renderChatItem(c)));
  }
  if(gRoot){
    groupList.forEach(c => gRoot.appendChild(renderChatItem(c)));
  }
}

function renderChatItem(chat){
  const li = el('li', 'chat-item');
  li.dataset.chatId = chat.id;

  const avatar = el('div', 'avatar');
  avatar.textContent = chat.name.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase();

  const info = el('div');
  const title = el('div', 'title'); title.textContent = chat.name;
  const sub = el('div', 'subtitle'); sub.textContent = `${chat.unread} unread • ${chat.last}`;
  info.appendChild(title); info.appendChild(sub);

  li.appendChild(avatar);
  li.appendChild(info);

  li.addEventListener('click', () => openModal(chat.id));
  return li;
}

// Modal logic
const modal = () => document.getElementById('modal');
const suggestionBox = () => document.getElementById('suggestionBox');
let currentChat = null;
let pointer = 0;

function openModal(chatId){
  currentChat = chatId;
  pointer = 0;
  renderSuggestion();
  const m = modal();
  if(m){ m.classList.remove('hidden'); m.setAttribute('aria-hidden','false'); }
}

function closeModal(){
  const m = modal();
  if(m){ m.classList.add('hidden'); m.setAttribute('aria-hidden','true'); }
}

function renderSuggestion(){
  const list = SUGGESTIONS[currentChat] || ["No suggestion available yet."];
  const text = list[pointer % list.length];
  suggestionBox().textContent = text;
}

function confirmSend(){
  // Placeholder - replace with real send call
  const chosen = suggestionBox().textContent;
  alert(`Message sent:\n\n${chosen}`);
  closeModal();
}

function nextSuggestion(){
  pointer += 1;
  renderSuggestion();
}

document.addEventListener('DOMContentLoaded', () => {
  mountLists();

  // Modal bindings
  document.getElementById('btnConfirm')?.addEventListener('click', confirmSend);
  document.getElementById('btnAnother')?.addEventListener('click', nextSuggestion);
  document.querySelectorAll('[data-close="true"]').forEach(btn => btn.addEventListener('click', closeModal));
  document.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
});
