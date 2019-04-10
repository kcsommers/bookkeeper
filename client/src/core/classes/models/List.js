import { deleteList } from '../../redux/actions/lists.actions';

export default class List {
  constructor(id, name, userId, bookIds) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.bookIds = bookIds;
  }

  removeFromStore(store) {
    store.dispatch(deleteList(this.id));
  }
}