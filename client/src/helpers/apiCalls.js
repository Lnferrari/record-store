import axios from 'axios';

const serverUrl = 'http://localhost:5000'

export const getRecords = async () => {
  try {
    const res = await (
      await axios(`${serverUrl}/records`)).data;
    return res
  } catch (error) {
    return error.response.data
  }
}

export const SignInUser = async (user) => {
  try {
    const res = await (
      await axios.post(
        `${serverUrl}/users/login`,
        user
      )
    ).data
    return res
  } catch (error) {
    return error.response.data
  }
}

export const SignUpUser = async (user) => {
  try {
    const res = await (
      await axios.post(
        `${serverUrl}/users`,
        user
      )
    ).data;
    return res
  } catch (error) {
    return error.response.data
  }
}

export const updateUser = async (user) => {
  try {
    const res = await (
      await axios.patch(
        `${serverUrl}/users/${user._id}`,
        { cart: user.cart }
      )
    ).data
    return res
  } catch (error) {
    return error.response.data
  }
}

export const createOrder = async (order) => {
  try {
    const res = await (
      await axios.post(
        `${serverUrl}/users/${order.userId}/orders`,
        order
      )
    ).data
    return res
  } catch (error) {
    return error.response.data
  }
}