import Environment from '../../../environment';

const FormTypes = {
  user: {
    url: `${Environment.BASE_URL}/users`,
    inputs: {
      username: {
        field: 'username',
        placeholder: 'Username',
        value: ''
      },
      email: {
        field: 'email',
        placeholder: 'Email',
        value: ''
      },
      password: {
        field: 'password',
        placeholder: 'Password',
        value: ''
      },
      location: {
        field: 'location',
        placeholder: 'Location',
        value: ''
      }
    }
  },
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