/*
  ╔══════════════════════════════════════════════════════════╗
  ║  ГЕНЕРАТОР КОМАНД — в этом файле спрятано 10 ошибок!   ║
  ║  Найди и исправь все баги, чтобы приложение работало.   ║
  ║                                                          ║
  ║  Что должно работать:                                    ║
  ║  1. Добавление участников (без дублей, не пустое)        ║
  ║  2. Удаление участника по кнопке ✕                       ║
  ║  3. Счётчик участников обновляется                       ║
  ║  4. Таймер: старт, стоп, сброс на 30 сек                ║
  ║  5. Генерация случайных команд заданного размера         ║
  ╚══════════════════════════════════════════════════════════╝
*/

// ── Список участников ────────────────────────────────────────
let players = [];

const nameInput   = document.getElementById("name-input");
const addForm     = document.getElementById("add-form");
const playersList = document.getElementById("players-list");
const countSpan   = document.getElementById("count");

addForm.addEventListener("click", (e) => {
  e.preventDefault();
  const name = nameInput.value;  //тут нужно сделать чтоб не работали пробелы как имя(trim вроде) (ошибка 1)

  if (name === "") return;       

  if (players.includes(name)) {
    alert("Такой участник уже есть!");
    return;
  }

  players.push(name);
  nameInput.value = "";
  renderPlayers();
});

function renderPlayers() {
  playersList.innerHTML = "";


  //тут надо добавить обновление счетчика участников(ошибка 2)
  players.forEach((name, i) => {
    const li = document.createElement("li");
    li.textContent = name;

    const btn = document.createElement("button");
    btn.textContent = "✕";

    btn.addEventListener("click", () => {
      players.splice(i); // тут удаляются все элементы начиная с i, над сделать (i, 1) (ошибка 3)
      renderPlayers();
    });

    li.append(btn);
    playersList.append(li);
  });


}

// ── Таймер ───────────────────────────────────────────────────
let seconds = 30;
let timerInterval = null;

const timerDisplay = document.getElementById("timer-display");
const startBtn     = document.getElementById("start-btn");
const stopBtn      = document.getElementById("stop-btn");
const resetBtn     = document.getElementById("reset-btn");

function updateTimerDisplay() {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  //.padStart работает только со строками, а в него пихают числа(ошибка 7(вообще тут 2 раза одна и та же ошибка и я не знаю можно ли это считать за 2))
  timerDisplay.textContent = `${m.padStart(2, "0")}:${s.padStart(2, "0")}`;// тут надо сделать чтоб таймер визуально останавливался при достижении нуля, яхз как (ошибка 6)
}

startBtn.addEventListener("click", () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    //таймер в минус уходит, нужно добавить условие <=0(ошибка 5)
    seconds--;
    updateTimerDisplay();
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = 30;
  updateTimerDisplay();
});

// ── Генерация команд ─────────────────────────────────────────
const teamSizeInput = document.getElementById("team-size");
const generateBtn   = document.getElementById("generate-btn");
const teamsOutput   = document.getElementById("teams-output");

generateBtn.addEventListener("click", () => {
  //тут value - это строка, надо поменять тип данных(ошибка 4)
  const size = teamSizeInput.value; 

  if (players.length < size) {
    alert("Нужно больше участников!");
    return;
  }

  // Перемешиваем копию массива
  const shuffled = players.sort(() => Math.random() - 0.5);  

  const teams = [];
  for (let i = 0; i < shuffled.length; i += size) {
    teams.push(shuffled.slice(i, i + size));
  }

  teamsOutput.innerHTML = "";
  teams.forEach((team, idx) => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML = `
      <h3>Команда ${idx + 1}</h3>
      <p>${team.join(", ")}</p>
    `;
    teamsOutput.append(card);
  });
});

// ── Инициализация ────────────────────────────────────────────
updateTimerDisplay();