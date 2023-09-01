const URL_API = 'http://localhost:4000'

export default {
  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${URL_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    if (!response.ok) {
      const errorResponse = await response.json()
      throw errorResponse.error
    }
    const resposeData = await response.json()
    $cookies.set('auth', resposeData.data)
    return resposeData
  },

  async register(credentials: { name: string; email: string; password: string }) {
    const response = await fetch(`${URL_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    if (!response.ok) {
      const errorResponse = await response.json()
      throw errorResponse.error
    }
    return response.json()
  }
}
