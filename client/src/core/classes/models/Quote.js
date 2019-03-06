export default class Note {
  constructor(
    content,
    page,
    bookId,
    userId,
    id
  ) {
    this.content = content;
    this.page = page;
    this.bookId = bookId;
    this.userId = userId;
    this.id = id;
  }
}