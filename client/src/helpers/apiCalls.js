const serverUrl = 'https://stupid-server.vercel.app'

export const getRecords = async () => {
  try {
    const data = await(await fetch(`${serverUrl}/records`)).json();
    return data
  } catch (error) {
    console.log(error)
  }
}