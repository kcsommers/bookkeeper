import { addQuote } from '../../redux/actions/quotes.actions';
import { addQuoteToBook } from '../../redux/actions/books.actions';

export default class Quote {
  constructor(
    id,
    content,
    page,
    bookId,
    userId,
    createdAt
  ) {
    this.id = id;
    this.content = content;
    this.page = page;
    this.bookId = bookId;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  addToStore(store) {
    store.dispatch(addQuote(this));
    this.addToBook(store);
  }

  addToBook(store) {
    store.dispatch(addQuoteToBook(this.bookId, this.id));
  }
}