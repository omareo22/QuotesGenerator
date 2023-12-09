// get quotes from API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const copyButton = document.getElementById("copy");

let apiQuotes = [];

//show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  loading();
  // pick a random quote from api array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if null
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote;
    //  console.log(apiQuotes[Math.random() * apiQuotes.length | 0]);
    newQuote();
  } catch (error) {
    // catch error here
  }
}

//tweet quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//copy quote
// Notification element
const notification = document.createElement("div");
notification.classList.add("notification");

function copyQuote(event) {
  const copyText = quoteText.textContent;
  const copyAuthor = authorText.textContent;
  const copy = `${copyText} - ${copyAuthor}`;
  navigator.clipboard.writeText(copy);

  notification.textContent = "Quote copied!";

  // Position
  const quoteContainerRect = quoteContainer.getBoundingClientRect();
  const quoteContainerCenter =
    quoteContainerRect.left + quoteContainerRect.width / 2;
  const notificationWidth = notification.offsetWidth;
  const notificationCenter = quoteContainerCenter - notificationWidth / 2;

  notification.style.left = `${notificationCenter}px`;
  notification.style.top = `${quoteContainerRect.bottom}px`;

  if (!document.body.contains(notification)) {
    document.body.appendChild(notification);
  }

  setTimeout(() => {
    notification.remove();
  }, 1000);
}

//event listeners on buttons
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
copyButton.addEventListener("click", copyQuote);
//on load
getQuotes();
