import axios from 'axios';

const getAuth = () => {
  return `Bearer ${localStorage.getItem('ref')}`;
};

export const signUp = async (endpoint, payload) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
      payload
    );
  } catch (error) {
    throw new Error('Network Error');
  }
};

export const login = async (endpoint, payload) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
      payload
    );
  } catch (error) {
    throw new Error('Network Error');
  }
};

export const getAdmin = async (endpoint) => {
  try {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: getAuth()
      }
    });
  } catch (error) {
    throw new Error('Network Error');
  }
};

export const editAdmin = async (endpoint, payload) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
      payload,
      {
        headers: {
          Authorization: getAuth()
        }
      }
    );
  } catch (error) {
    throw new Error('Network Error');
  }
};

export const forgetPasswordAdmin = async (endpoint, payload) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
      payload
    );
  } catch (error) {
    throw new Error('Network Error');
  }
};

export const resetPasswordAdmin = async (endpoint, payload) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
      payload
    );
  } catch (error) {
    throw new Error('Network Error');
  }
};

export const createUser = async (endpoint, payload) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BASE_URL_USER}/${endpoint}`,
      payload,
      {
        headers: {
          Authorization: getAuth()
        }
      }
    );
  } catch (error) {
    throw new Error('Network Error');
  }
};

export const editUser = async (endpoint, payload) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_BASE_URL_USER}/${endpoint}`,
      payload,
      {
        headers: {
          Authorization: getAuth()
        }
      }
    );
  } catch (error) {
    throw new Error('Network Error');
  }
};

export const getUser = async (endpoint) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_BASE_URL_USER}/${endpoint}`,
      {
        headers: {
          Authorization: getAuth()
        }
      }
    );
  } catch (error) {
    throw new Error('Network Error');
  }
};

export const getAllUsers = async (endpoint) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_BASE_URL_USER}/${endpoint}`,
      {
        headers: {
          Authorization: getAuth()
        }
      }
    );
  } catch (error) {
    throw new Error('Network Error');
  }
};
