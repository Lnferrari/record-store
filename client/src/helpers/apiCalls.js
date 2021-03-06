import axios from 'axios';

// const serverUrl = 'http://localhost:5000'
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

export const getRecords = async () => {
  try {
    const res = await (
      await axios(`/records`)).data;
    return res
  } catch (error) {
    return error.response.data
  }
}

export const SignInUser = async (user) => {
  try {
    const res = await (
      await axios.post(
        `/users/login`,
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
        `/users`,
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
        `/users/${user._id}`,
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
        `/users/${order.userId}/orders`,
        order
      )
    ).data
    return res
  } catch (error) {
    return error.response.data
  }
}

export const authenticateUser = async () => {
  try {
    const res = await (
      await axios.post(
        `/users/auth`
      )
    ).data;
    return res
  } catch (error) {
    return error.response.data
  }
}

export const authenticateAccount = async (token) => {
  try {
    const res = await (
      await axios.post(
        `/users/verify-email/${token}`
      )
    ).data;
    return res
  } catch (error) {
    return error.response.data
  }
}

export const googleSignUp = async (data) => {
  try {
    const res = await (
      await axios.post(
        `/users/googleSignUp`,
        data
      )
    ).data;
    return res
  } catch (error) {
    return error.response.data
  }
}