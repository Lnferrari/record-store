import axios from 'axios';

const serverUrl = 'http://localhost:5000'

export const getRecords = async () => {
  try {
    const res = await axios(`${serverUrl}/records`);
    const data = res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export const SignInUser = async (data) => {
  try {
    const res = await axios.post(
      `${serverUrl}/users/login`,
      data
    );
    const result = res.data
    return result
  } catch (error) {
    return error
  }
}

export const SignUpUser = async (data) => {
  try {
    const res = await axios.post(
      `${serverUrl}/users`,
      data
    );
    const result = res.data
    return result
  } catch (error) {
    return error
  }
}