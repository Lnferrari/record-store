import axios from 'axios';

const serverUrl = 'http://localhost:5000'

export const getRecords = async () => {
  try {
    const res = await axios(`${serverUrl}/records`);
    return res.data
  } catch (error) {
    return error.response.data
  }
}

export const SignInUser = async (data) => {
  try {
    const res = await axios.post(
      `${serverUrl}/users/login`,
      data
    );
    return res.data
  } catch (error) {
    return error.response.data
  }
}

export const SignUpUser = async (data) => {
  try {
    const res = await axios.post(
      `${serverUrl}/users`,
      data
    );
    return res.data
  } catch (error) {
    return error.response.data
  }
}

export const updateUser = async (user) => {
  const res = await axios.patch(
    `${serverUrl}/users/${user._id}`,
    { cart: user.cart }
  )
  return res.data
}