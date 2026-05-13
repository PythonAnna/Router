const langMenuBtn = document.querySelector(".btn-lang-menu");
const langDropdown = document.getElementById("langDropdown");

langMenuBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    langDropdown.classList.toggle("open");
});

document.addEventListener("click", function() {
    langDropdown.classList.remove("open");
});

const btnDict = document.querySelector(".btn-german");
const dict = document.querySelector(".dict-german");
const btnClose = document.querySelector(".btn-close-german");
const form = document.querySelector(".dict-form");
const inputs = document.querySelectorAll(".dict-input");
const list = document.querySelector(".dict-list-german");

let words = JSON.parse(localStorage.getItem("germanWords")) || [];

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
    localStorage.setItem("germanWords", JSON.stringify(words));
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

var volkImages = [
    'https://i.pinimg.com/736x/10/d4/68/10d468d452316b2c36c134597fd77eb4.jpg',
    'https://www.umniza.de/WebRoot/Store22/Shops/62303963/5D15/548C/3779/A826/F4E1/0A0C/6D02/0CF3/F2-12654.jpg'
];
var volkIndex = 0;

function changeVolkImage() {
    var img = document.querySelector(".volk-image");
    img.src = volkImages[volkIndex];
    volkIndex++;
    if (volkIndex >= volkImages.length) {
        volkIndex = 0;
    }
}

setInterval(changeVolkImage, 3000);

var volkImages = [
    'https://i.pinimg.com/736x/10/d4/68/10d468d452316b2c36c134597fd77eb4.jpg',
    'https://www.umniza.de/WebRoot/Store22/Shops/62303963/5D15/548C/3779/A826/F4E1/0A0C/6D02/0CF3/F2-12654.jpg'
];
var volkIndex = 0;

function changeVolkImage() {
    var img = document.getElementById("volkAvatar");
    img.src = volkImages[volkIndex];
    volkIndex++;
    if (volkIndex >= volkImages.length) {
        volkIndex = 0;
    }
}

setInterval(changeVolkImage, 3000);
