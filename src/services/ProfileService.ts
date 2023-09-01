import type { IUser } from '@/models/user/user'

const URL_API = 'http://localhost:4000'

export default {
  async getProfile(): Promise<IUser> {
    const response = await fetch(`${URL_API}/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        Authorization: `Bearer ${$cookies.get('auth')}`
      }
    })
    if (!response.ok) {
      const errorResponse = await response.json()
      throw errorResponse.error
    }
    const responseData = await response.json()
    return responseData.data
  },

  async putProfile(user: IUser) {
    const response = await fetch(`${URL_API}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        Authorization: `Bearer ${$cookies.get('auth')}`
      },
      body: JSON.stringify(user)
    })
    if (!response.ok) {
      const errorResponse = await response.json()
      throw errorResponse.error
    }
    return response.json()
  }
}
