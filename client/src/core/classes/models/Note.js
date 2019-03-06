export default class Note {
  constructor(
    content,
    bookId,
    userId,
    id
  ) {
    this.content = content;
    this.bookId = bookId;
    this.userId = userId;
    this.id = id;
  }
}