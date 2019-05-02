import ModalContent from '../classes/ModalContent';
import { store } from '../redux/store';

export const ScreenService = {
  getItemsById(items, ids) {
    const storeItems = store.getState()[items];
    const results = [];
    ids.forEach(id => { results.push(storeItems[id]); });
    return results;
  },

  getModalContent(template, content, actions, component) {
    const newModal = new ModalContent(template, content, actions, component);
    newModal.initModal();
    return newModal;
  }
};