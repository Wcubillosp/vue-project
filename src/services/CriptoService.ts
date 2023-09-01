import type { ICripto } from '@/models/cripto/cripto'

const URL_API = 'http://localhost:4000'

export default {
  async getCoinMarketcap(): Promise<ICripto[]> {
    const response = await fetch(`${URL_API}/cripto/getListingsLatest`, {
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
    return responseData.data.data
  }
}
