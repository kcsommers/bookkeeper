import { updateUser } from '../../redux/actions/user.actions';

export default class User {
  constructor(
    id, username, email, password, location, image, banner, listIds
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.location = location;
    this.image = image;
    this.banner = banner;
    this.listIds = listIds;
  }

  update(store, newData) {
    store.dispatch(updateUser(newData));
  }
}