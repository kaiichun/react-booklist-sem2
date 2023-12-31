const express = require("express");
const app = express();

const books = [
  {
    id: 1,
    title: "Book One",
    description: "Description of book one",
    authorId: 1,
    genre: "horror",
  },
  {
    id: 2,
    title: "Book Two",
    description: "Description of book two",
    authorId: 2,
    genre: "romance",
  },
  {
    id: 3,
    title: "Book Three",
    description: "Description of book three",
    authorId: 1,
    genre: "horror",
  },
];

let reviews = [
  { id: 1, text: "Amazing book!", bookId: 1 },
  { id: 2, text: "Decent read.", bookId: 2 },
];

let authors = [
  { id: 1, name: "Author One", bio: "Bio of Author One" },
  { id: 2, name: "Author Two", bio: "Bio of Author Two" },
];

// /books?genre=horror
// /books?genre=horror&author=2
app.get("/books", (request, response) => {
  const genre = request.query.genre;
  const author = req.query.author;
  if (genre || author) {
    const filteredBooks = books.filter((b) => {
      if (genre && author) {
        return b.genre === genre && b.authorId == author;
      } else if (genre) {
        return b.genre === genre;
      } else if (author) {
        return b.authorId == author;
      }
    });
    response.json(filteredBooks);
  } else {
    response.json(books);
  }
});

app.get("/books/:id", (request, response) => {
  const book = books.find(
    (b) => parseInt(b.id) === parseInt(request.params.id)
  );
  if (book) {
    const author = authors.find((author) => author.id === book.authorId);
    response.status(200).json({ ...book, name: author.name, bio: author.bio });
  } else {
    response.status(400).json("ID provided is not available");
  }
});
app.get("/reviews", (request, response) => {
  response.json(reviews);
});

app.get("/reviews/:id", (request, response) => {
  const review = reviews.find(
    (r) => parseInt(r.id) === parseInt(request.params.id)
  );
  if (review) {
    const book = books.find((b) => b.id === review.bookId);
    response.status(200).json({ ...review, book_title: book.title });
  } else {
    response.status(400).json("ID provided is not available");
  }
});

app.get("/authors", (require, response) => {
  response.json(authors);
});

app.get("/authors/:id", (require, response) => {
  const author = authors.find(
    (a) => parseInt(a.id) === parseInt(require.params.id)
  );
  if (author) {
    response.status(200).json(author);
  } else {
    response
      .status(400)
      .json({ error: "Authors ID provided is not available" });
  }
});

app.get("/", (request, response) => {
  response.send(
    '<a href="/books">Books</a> <br/> <a href="/reviews"> Reviews </a> <br/> <a href="/authors">Authors</a>'
  );
});

app.listen(9000, () => {
  console.log("Bookstore app is running on port 9000");
});
