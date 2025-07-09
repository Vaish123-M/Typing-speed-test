const quotes = [
  `Typing is a vital skill in today’s world, essential for students, professionals, and anyone working with computers. From writing emails to coding and documentation, good typing skills improve both speed and accuracy. As you type more, your hands develop muscle memory, making the task feel natural and less tiring. It also helps reduce mistakes and boosts productivity. Practicing with structured paragraphs helps build fluency and focus. Over time, your ability to type quickly without looking at the keyboard strengthens, allowing smoother communication and better time management. Like any skill, consistency is key to becoming an efficient typist.`,

  `In a world driven by technology, typing has become a daily necessity. Whether it’s preparing presentations, chatting online, or entering data, fast and accurate typing makes tasks easier and more efficient. Touch typing allows you to focus more on ideas and less on the keyboard. With regular practice, you not only boost your speed but also improve concentration and reduce physical strain. Many employers value typing proficiency, especially in jobs involving content creation, programming, or administration. By training yourself to type without errors, you gain confidence and perform better in both academic and professional environments.`,

  `Typing helps you communicate ideas clearly and quickly, especially in fast-paced work and study environments. Instead of thinking about where each key is, your fingers begin to move automatically, giving your brain more space to think creatively. Learning to type with accuracy builds discipline and attention to detail. It's not just about hitting keys fast — it's about understanding and delivering content correctly. Whether you're writing a paper or chatting with a client, strong typing skills save time and effort. With regular practice, typing becomes second nature, empowering you to work smarter and express yourself effectively.`
];


const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const resultBox = document.getElementById("result");
const finalTime = document.getElementById("finalTime");
const finalWPM = document.getElementById("finalWPM");
const finalAccuracy = document.getElementById("finalAccuracy");
const feedbackMessage = document.getElementById("feedbackMessage");

let quoteText = "";
let timer = null;
let startTime = null;

function loadQuote() {
  quoteText = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerText = quoteText;
}

function startTest() {
  loadQuote();
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  resultBox.classList.add("hidden");

  startTime = new Date();
  clearInterval(timer);
  timer = setInterval(updateTime, 1000);
}

function updateTime() {
  const elapsed = Math.floor((new Date() - startTime) / 1000);
  const typed = inputEl.value;
  const wordsTyped = typed.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minutes = elapsed / 60;
  const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
  const correctChars = typed.split('').filter((char, i) => char === quoteText[i]).length;
  const accuracy = quoteText.length > 0 ? Math.round((correctChars / quoteText.length) * 100) : 0;

  timeEl.innerText = elapsed;
  wpmEl.innerText = wpm;
  accuracyEl.innerText = accuracy;
}


function showResults() {
  if (!startTime) return;

  clearInterval(timer);
  const elapsed = Math.floor((new Date() - startTime) / 1000);
  const typed = inputEl.value;
  const wordsTyped = typed.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minutes = elapsed / 60;
  const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
  const correctChars = typed.split('').filter((char, i) => char === quoteText[i]).length;
  const accuracy = quoteText.length > 0 ? Math.round((correctChars / quoteText.length) * 100) : 0;

  finalTime.innerText = elapsed;
  finalWPM.innerText = wpm;
  finalAccuracy.innerText = accuracy;

  if (wpm >= 60) {
    feedbackMessage.innerText = "🔥 You're a typing pro!";
  } else if (wpm >= 40) {
    feedbackMessage.innerText = "💪 Great job! You're fast.";
  } else if (wpm >= 25) {
    feedbackMessage.innerText = "🙂 Good effort. Keep practicing!";
  } else {
    feedbackMessage.innerText = "📝 Keep going! Practice makes perfect.";
  }

  // ✅ Show the result box
  resultBox.classList.remove("hidden");
}


function stopTest() {
  clearInterval(timer);
  inputEl.disabled = true;
}

function restartTest() {
  clearInterval(timer);
  inputEl.value = "";
  quoteEl.innerText = "Loading...";
  inputEl.disabled = true;
  timeEl.innerText = "0";
  wpmEl.innerText = "0";
  accuracyEl.innerText = "0";
  resultBox.classList.add("hidden");
  startTime = null;
}

startBtn.addEventListener("click", startTest);
stopBtn.addEventListener("click", stopTest);

nextBtn.addEventListener("click", startTest);
restartBtn.addEventListener("click", restartTest);

inputEl.addEventListener("input", updateTime);
