import axios from 'axios'
import CredentialsProvider from 'next-auth/providers/credentials'

const providers = [
  CredentialsProvider({
    name:'Credentials',
    authorize: async (credentials) => {
      try{
        const user = await axios.post()
      }
    }
  })
]