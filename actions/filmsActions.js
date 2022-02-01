import axios from 'axios'
import { useQuery } from 'react-query'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const list = ({ cacheTime } = {}) => {
  return useQuery(
    ['listFilms'],
    async () => {
      const { data } = await axios.get(publicRuntimeConfig.API_URL)
      return data
    },
    {
      cacheTime: cacheTime || 60000,
    }
  )
}
