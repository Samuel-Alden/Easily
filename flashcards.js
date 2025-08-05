let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
let currentIndex = 0;
let showingFront = true;

function addFlashcard() {
  const front = document.getElementById("cardFront").value.trim();
  const back = document.getElementById("cardBack").value.trim();

  if (!front || !back) {
    alert("Please enter both front and back of the flashcard.");
    return;
  }

  flashcards.push({ front, back });
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  document.getElementById("cardFront").value = "";
  document.getElementById("cardBack").value = "";

  if (flashcards.length === 1) currentIndex = 0;
  displayCard();
}

function displayCard() {
  const cardText = document.getElementById("cardText");
  if (flashcards.length === 0) {
    cardText.innerText = "No flashcards yet!";
    return;
  }

  const card = flashcards[currentIndex];
  cardText.innerText = showingFront ? card.front : card.back;
}

function flipCard() {
  if (flashcards.length === 0) return;
  showingFront = !showingFront;
  displayCard();
}

function nextCard() {
  if (flashcards.length === 0) return;
  currentIndex = (currentIndex + 1) % flashcards.length;
  showingFront = true;
  displayCard();
}

function prevCard() {
  if (flashcards.length === 0) return;
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  showingFront = true;
  displayCard();
}

function deleteCurrentCard() {
  if (flashcards.length === 0) return;
  flashcards.splice(currentIndex, 1);
  if (currentIndex >= flashcards.length) currentIndex = flashcards.length - 1;
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  showingFront = true;
  displayCard();
}

window.onload = displayCard;