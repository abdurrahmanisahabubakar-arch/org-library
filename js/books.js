const books = [
  { id: 1, title: "The Girl Who Loves the World", author: "M. L. Smith", category: "Kids", image: "img/book001.webp", status: "Available", link: "https://www.amazon.com/Girl-Who-Loves-World-experiencing/dp/1519588631" },
  { id: 2, title: "Little Readers Club", author: "AIA Kids", category: "Kids", image: "img/book002.webp", status: "Available" },
  { id: 3, title: "Bright Stories", author: "M. Bello", category: "Kids", image: "img/book003.webp", status: "Borrowed" },
  { id: 4, title: "My First Library", author: "Sarah Lane", category: "Kids", image: "img/book004.webp", status: "Available" },
  { id: 5, title: "Fun With Words", author: "Aisha Musa", category: "Kids", image: "img/book005.webp", status: "Available" },
  { id: 6, title: "Into the Wild Road", author: "James Carter", category: "Adventure", image: "img/book01.webp", status: "Available" },
  { id: 7, title: "Hidden Island", author: "Nora West", category: "Adventure", image: "img/book02.webp", status: "Borrowed" },
  { id: 8, title: "River of Courage", author: "Daniel Stone", category: "Adventure", image: "img/book03.webp", status: "Available" },
  { id: 9, title: "The Mountain Gate", author: "Lina Hart", category: "Adventure", image: "img/book04.webp", status: "Available" },
  { id: 10, title: "Journey Beyond", author: "A. Rogers", category: "Adventure", image: "img/book05.jpeg", status: "Available" },
  { id: 11, title: "Study Skills Guide", author: "AIA Learning", category: "Student", image: "img/book-s1.jpeg", status: "Available" },
  { id: 12, title: "Basic Science Notes", author: "Dr. Kabir", category: "Student", image: "img/book-s2.jpeg", status: "Borrowed" },
  { id: 13, title: "English Made Easy", author: "Grace Daniel", category: "Student", image: "img/book-s3.jpeg", status: "Available" },
  { id: 14, title: "Mathematics Practice", author: "Ibrahim Yusuf", category: "Student", image: "img/book-s4.jpeg", status: "Available" },
  { id: 15, title: "Exam Success Planner", author: "AIA Tutors", category: "Student", image: "img/book-s5.jpeg", status: "Available" },
  { id: 16, title: "Labarin Zamani", author: "Sani Musa", category: "Hausa", image: "img/book-h1.jpeg", status: "Available" },
  { id: 17, title: "Hikayoyin Hausa", author: "Zainab Ali", category: "Hausa", image: "img/book-h2.jpeg", status: "Available" },
  { id: 18, title: "Rayuwar Gari", author: "Umar Bello", category: "Hausa", image: "img/book-h3.jpeg", status: "Borrowed" },
  { id: 19, title: "Taurarin Ilimi", author: "Hauwa Garba", category: "Hausa", image: "img/book-h4.jpeg", status: "Available" },
  { id: 20, title: "Maganar Zuciya", author: "Aminu Lawal", category: "Hausa", image: "img/book-h5.jpeg", status: "Available" },
  { id: 21, title: "Atomic Habits", author: "James Clear", category: "Other", image: "img/book1.webp", status: "Available", link: "https://dn790007.ca.archive.org/0/items/atomic-habits-pdfdrive/Atomic%20habits%20%28%20PDFDrive%20%29.pdf" },
  { id: 22, title: "Creative Thinking", author: "Maya Cole", category: "Other", image: "img/book2.jpeg", status: "Available" },
  { id: 23, title: "Leadership Basics", author: "T. Morgan", category: "Other", image: "img/book3.webp", status: "Borrowed" },
  { id: 24, title: "Personal Finance", author: "Samir Khan", category: "Other", image: "img/book4.jpeg", status: "Available" },
  { id: 25, title: "Healthy Living", author: "Dr. Paul Grant", category: "Other", image: "img/book5.jpeg", status: "Available" },
  { id: 26, title: "Public Speaking", author: "Rita John", category: "Other", image: "img/book6.jpeg", status: "Available" },
  { id: 27, title: "Digital Skills", author: "AIA Tech", category: "Other", image: "img/book7.jpeg", status: "Available" },
  { id: 28, title: "Time Management", author: "Helen Brooks", category: "Other", image: "img/book8.jpeg", status: "Borrowed" },
  { id: 29, title: "World History", author: "Chris Allen", category: "Other", image: "img/book9.webp", status: "Available" },
  { id: 30, title: "The Smart Learner", author: "Fatima Yusuf", category: "Other", image: "img/book10.webp", status: "Available" },
  { id: 31, title: "Science Today", author: "K. Ade", category: "Other", image: "img/book11.webp", status: "Available" },
  { id: 32, title: "Better Writing", author: "Laila James", category: "Other", image: "img/book12.webp", status: "Available" }
];

const state = {
  query: "",
  category: "All",
  availability: "All",
  saved: new Set(JSON.parse(localStorage.getItem("aiaSavedBooks") || "[]")),
  borrowed: new Set(JSON.parse(localStorage.getItem("aiaBorrowedBooks") || "[]"))
};

const grid = document.querySelector("[data-book-grid]");
const count = document.querySelector("[data-result-count]");
const search = document.querySelector("[data-search]");
const availability = document.querySelector("[data-availability]");
const chips = document.querySelectorAll("[data-category]");
const empty = document.querySelector("[data-empty]");

function effectiveStatus(book) {
  if (state.borrowed.has(book.id)) return "Borrowed";
  return book.status;
}

function persist() {
  localStorage.setItem("aiaSavedBooks", JSON.stringify([...state.saved]));
  localStorage.setItem("aiaBorrowedBooks", JSON.stringify([...state.borrowed]));
}

function filteredBooks() {
  const query = state.query.trim().toLowerCase();
  return books.filter((book) => {
    const status = effectiveStatus(book);
    const matchesQuery = !query || [book.title, book.author, book.category].join(" ").toLowerCase().includes(query);
    const matchesCategory = state.category === "All" || book.category === state.category;
    const matchesAvailability = state.availability === "All" || status === state.availability;
    return matchesQuery && matchesCategory && matchesAvailability;
  });
}

function render() {
  const visibleBooks = filteredBooks();
  count.textContent = `${visibleBooks.length} book${visibleBooks.length === 1 ? "" : "s"} found`;
  empty.hidden = visibleBooks.length > 0;
  grid.innerHTML = visibleBooks.map((book) => {
    const status = effectiveStatus(book);
    const isSaved = state.saved.has(book.id);
    const isBorrowed = status === "Borrowed";
    return `
      <article class="book-card">
        <div class="book-cover">
          <img src="${book.image}" alt="${book.title} cover">
          <span class="status ${isBorrowed ? "borrowed" : ""}">${status}</span>
          <button class="save-btn ${isSaved ? "saved" : ""}" type="button" data-save="${book.id}" aria-label="Save ${book.title}">${isSaved ? "★" : "☆"}</button>
        </div>
        <div class="book-body">
          <h3>${book.title}</h3>
          <div class="meta">${book.author}</div>
          <div class="meta">${book.category}</div>
          <div class="book-actions">
            <button class="btn" type="button" data-borrow="${book.id}">${isBorrowed ? "Return" : "Borrow"}</button>
            <a class="icon-btn" href="${book.link || "#"}" ${book.link ? 'target="_blank" rel="noopener"' : ""} aria-label="Open ${book.title}">↗</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

search.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

availability.addEventListener("change", (event) => {
  state.availability = event.target.value;
  render();
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    state.category = chip.dataset.category;
    render();
  });
});

grid.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  const borrowButton = event.target.closest("[data-borrow]");
  if (saveButton) {
    const id = Number(saveButton.dataset.save);
    if (state.saved.has(id)) state.saved.delete(id);
    else state.saved.add(id);
    persist();
    render();
  }
  if (borrowButton) {
    const id = Number(borrowButton.dataset.borrow);
    if (state.borrowed.has(id)) state.borrowed.delete(id);
    else state.borrowed.add(id);
    persist();
    render();
  }
});

render();
