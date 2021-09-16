import axios from 'axios'

const serverUrl = 'https://localhost:5000'

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
    console.log(res)
    const result = res.data
    return result
  } catch (error) {
    return error
  }
}