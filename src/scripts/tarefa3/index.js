const { userTypeDiscount, bookStoreBooks } = require("./database");

const findBooksByCategory = (bookList, category) => {
  const filteredBooks = [];
  bookList.forEach((element) => {
    const book = element.categories.filter(
      (cat) => cat.toLowerCase() === category.toLowerCase()
    );
    if (book.length > 0) {
      filteredBooks.push(element);
    }
    console.log(filteredBooks);
  });
};

const findBookById = (bookList, bookId) =>
  bookList.find((book) => book.id === bookId);

const sellBook = (bookList, bookId, userType = "normal") => {
  const book = bookList.find((book) => book.id === bookId);

  if (!book || book.quantity === 0) {
    return "Livro indisponível para compra.";
  }

  const discount = userTypeDiscount[userType] || 0;
  const finalPrice = (1 - discount) * book.price;

  book.quantity--;

  return `Livro ${book.title} vendido com sucesso por R$ ${finalPrice.toFixed(
    2
  )} (${discount * 100}% de desconto).`;
};

const calculateAverageRating = (bookList, bookId) => {
  const book = bookList.find((book) => book.id === bookId);

  if (!book) {
    return "Livro não encontrado.";
  }

  const ratings = book.ratings;

  if (ratings.length === 0) {
    return `O livro ${book.title} não possui nenhuma avaliação.`;
  }

  const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
  const averageRating = totalRating / ratings.length;

  return `O livro ${
    book.title
  } possui uma média de avaliação igual a ${averageRating.toFixed(2)}.`;
};