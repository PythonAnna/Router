// Меню языков
const langMenuBtn = document.querySelector(".btn-lang-menu");
const langDropdown = document.getElementById("langDropdown");
langMenuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle("open");
});
document.addEventListener("click", () => langDropdown.classList.remove("open"));

const btnDict = document.querySelector(".btn-german");
const dict = document.querySelector(".dict-german");
const btnClose = document.querySelector(".btn-close-german");
const form = document.querySelector(".dict-form");
const inputs = document.querySelectorAll(".dict-input");
const list = document.querySelector(".dict-list-german");
const chat = document.getElementById('mainChat');
const btn = document.getElementById('toggleChat');

let words = JSON.parse(localStorage.getItem('germanWords')) || [];

btnDict.addEventListener("click", () => {
    dict.style.display = "block";
});

btnClose.addEventListener("click", () => {
    dict.style.display = "none";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addWord();
});

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function addWord() {
    let word = inputs[0].value.trim();
    let translate = inputs[1].value.trim();
    
    if (word === "" || translate === "") {
        return;
    }
    
    let newWord = {
        id: Date.now(),
        word: word,
        translate: translate
    };
    
    words.push(newWord);
    inputs[0].value = "";
    inputs[1].value = "";
    
    saveWords();
    renderWords();
}

function saveWords() {
    localStorage.setItem('germanWords', JSON.stringify(words));
}

// Кнопка открытия/закрытия чата
btn.addEventListener('click', () => {
    if (chat.classList.contains('collapsed')) {
        chat.classList.remove('collapsed');
        chat.classList.add('expanded');
        btn.textContent = '−';
    } else {
        chat.classList.remove('expanded');
        chat.classList.add('collapsed');
        btn.textContent = '+';
    }
});

function renderWords() {
    list.innerHTML = "";
    
    words.forEach((wordItem) => {
        let item = document.createElement("li");
        item.classList.add("dict-item");
        
        let textSpan = document.createElement("span");
        textSpan.textContent = escapeHtml(wordItem.word) + " - " + escapeHtml(wordItem.translate);
        
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("dict-item__delete");
        deleteBtn.innerHTML = `<svg
            class="dict-item__icon"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="#cb6e6e"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </svg>`;

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation()
            words = words.filter(word => word.id !== wordItem.id);
            saveWords();
            renderWords();
        });
        
        item.append(textSpan, deleteBtn);
        list.appendChild(item);
    });
}

renderWords();

// Чат
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const messagesArea = document.querySelector('.messages-area');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (text === '') return;

  const msg = document.createElement('div');
  msg.classList.add('msg-row', 'right');
  msg.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
  messagesArea.appendChild(msg);
  messagesArea.scrollTop = messagesArea.scrollHeight;

  chatInput.value = '';
});
