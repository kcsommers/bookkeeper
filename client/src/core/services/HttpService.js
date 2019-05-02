/* eslint-disable no-undef */
import axios from 'axios';
import Environment from '../../../environment';

export const HttpService = {
  async create(endpoint, itemData) {
    const url = `${Environment.BASE_URL}/${endpoint}`;
    return new Promise(async (resolve, reject) => {
      try {
        const createResults = await axios.post(url, itemData);
        const { createdItem, error } = createResults.data;
        if (!error) {
          resolve(createdItem);
        } else {
          reject(new Error(error));
        }
      } catch (createError) {
        console.error('AXIOS ERROR CREATING ITEM', createError);
        reject(new Error(createError));
      }
    });
  },

  async update(endpoint, newData) {
    const url = `${Environment.BASE_URL}/${endpoint}`;
    console.log('URL:::: ', url);
    return new Promise(async (resolve, reject) => {
      try {
        const updateResults = await axios.post(url, newData);
        const { success, error } = updateResults.data;
        if (success) {
          resolve(success);
        } else {
          reject(new Error(error));
        }
      } catch (updateError) {
        console.warn('AXIOS ERROR UPDATING ITEM', updateError);
        reject(new Error(updateError));
      }
    });
  },

  async delete(endpoint, deleteData) {
    const url = `${Environment.BASE_URL}/${endpoint}`;
    return new Promise(async (resolve, reject) => {
      try {
        const deleteResults = await axios.delete(url, deleteData);
        const { success, error } = deleteResults.data;
        if (success) {
          resolve({ success });
        } else {
          reject(new Error(error));
        }
      } catch (deleteError) {
        console.warn('AXIOS ERROR DELETING ITEM', deleteError);
        reject(new Error(deleteError));
      }
    });
  },

  async upload(uploads) {
    const url = `${Environment.BASE_URL}/uploads`;
    const formData = new FormData();
    uploads.forEach(file => {
      const fileSplit = file.value.uri.split('/');
      const fileName = fileSplit[fileSplit.length - 1];
      formData.append(file.name, {
        uri: file.value.uri,
        name: fileName,
        type: `image/${fileName.split('.')[1]}`
      });
    });
    return axios.post(url, formData);
  },

  async searchBooks(searchTerm) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
    return new Promise(async (resolve, reject) => {
      try {
        const results = await axios.get(url);
        if (results) {
          resolve({ books: results.data.items });
        } else {
          console.warn('ERROR GETTING SEARCH RESULTS');
          reject(new Error('Something bad happened'));
        }
      } catch (searchError) {
        console.warn('AXIOS ERROR SEARCHING BOOKS', searchError);
        reject(new Error(searchError));
      }
    });
  }
};