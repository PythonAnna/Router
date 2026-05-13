const langMenuBtn = document.querySelector(".btn-lang-menu");
const langDropdown = document.getElementById("langDropdown");

langMenuBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    langDropdown.classList.toggle("open");
});

document.addEventListener("click", function() {
    langDropdown.classList.remove("open");
});

const btnDict = document.querySelector(".btn-english");
const dict = document.querySelector(".dict-english");
const btnClose = document.querySelector(".btn-close-english");
const form = document.querySelector(".dict-form");
const inputs = document.querySelectorAll(".dict-input");
const list = document.querySelector(".dict-list-english");

let words = JSON.parse(localStorage.getItem("englishWords")) || [];

btnDict.addEventListener("click", function() {
    dict.style.display = "block";
});

btnClose.addEventListener("click", function() {
    dict.style.display = "none";
});

form.addEventListener("submit", function(event) {
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
        alert("Введите слово и перевод");
        return;
    }

    let newWord = {
        id: Date.now(),
        word: word,
        translate: translate,
    };

    words.push(newWord);
    inputs[0].value = "";
    inputs[1].value = "";

    saveWords();
    renderWords();
}

function saveWords() {
    localStorage.setItem("englishWords", JSON.stringify(words));
}

function renderWords() {
    list.innerHTML = "";

    words.forEach(function(wordItem) {
        let item = document.createElement("li");
        item.classList.add("dict-item");

        let textSpan = document.createElement("span");
        textSpan.textContent = escapeHtml(wordItem.word) + " - " + escapeHtml(wordItem.translate);

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("dict-item__delete");
        deleteBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#cb6e6e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </svg>`;

        deleteBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            words = words.filter(function(w) {
                return w.id !== wordItem.id;
            });
            saveWords();
            renderWords();
        });

        item.append(textSpan, deleteBtn);
        list.appendChild(item);
    });
}

renderWords();

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

chatForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let text = chatInput.value.trim();
    if (text === "") return;
    chatInput.value = "";
});

var pinImages = [
    'https://web.archive.org/web/20240614004719im_/https://static.wikia.nocookie.net/smesharikiarhives/images/a/a8/%D0%9F%D0%B8%D0%BD_%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%BD%D1%8B%D0%B9_%D0%B7%D0%BD%D0%B0%D0%BA.png/revision/latest/scale-to-width-down/1200?cb=20200929163818&path-prefix=ru',
    'https://avatars.mds.yandex.net/i?id=d4ec27a5d79e8b2835434034567f28e7_sr-5865724-images-thumbs&n=13'
];
var pinIndex = 0;

function changePinImage() {
    var img = document.getElementById("pinAvatar");
    img.src = pinImages[pinIndex];
    pinIndex++;
    if (pinIndex >= pinImages.length) {
        pinIndex = 0;
    }
}

setInterval(changePinImage, 3000);
