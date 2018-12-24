import Environment from '../../../environment';

const FormTypes = {
  lists: {
    url: `${Environment.BASE_URL}/lists`,
    inputs: {
      name: {
        field: 'name',
        placeholder: 'List Name',
        value: ''
      }
    }
  }
};

export default FormTypes;