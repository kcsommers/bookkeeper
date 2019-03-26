export default class Book {
  constructor(
    id,
    title,
    authors,
    description,
    thumbnail,
    banner,
    current,
    noteIds,
    quoteIds
  ) {
    this.id = id;
    this.title = title;
    this.authors = authors;
    this.description = description;
    this.thumbnail = thumbnail;
    this.banner = banner;
    this.current = current;
    this.noteIds = noteIds;
    this.quoteIds = quoteIds;
  }
}