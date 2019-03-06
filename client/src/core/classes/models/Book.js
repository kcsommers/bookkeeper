export default class Book {
  constructor(
    title,
    authors,
    description,
    thumbnail,
    banner,
    current,
    notes,
    quotes,
    id
  ) {
    this.title = title;
    this.authors = authors;
    this.description = description;
    this.thumbnail = thumbnail;
    this.banner = banner;
    this.current = current;
    this.notes = notes;
    this.quotes = quotes;
    this.id = id;
  }
}