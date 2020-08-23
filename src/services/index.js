import axios from 'axios'

class API {
  async registerProvider1(params) {
    try {
      const requestUrl = "localhost:8080"
      const { data } = await axios.post(`http://${requestUrl}/registerProvider`, params)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }
  async fetchAllCategories(params) {
    try {
      const requestUrl = "localhost:8080"
      const { data } = await axios.post(`http://${requestUrl}/registerProvider`, params)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }

  async userLogin(params) {
    try {
      const requestUrl = "localhost:8080"
      const { data } = await axios.post(`http://${requestUrl}/auth/authenticateUserLogin`, params)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }
  async verifyOTP(params) {
    try {
      const requestUrl = "localhost:8080"
      const { data } = await axios.post(`http://${requestUrl}/user/verifyUserProfile`, params)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }

  async userProfileNew(params) {
    try {
      const requestUrl = "localhost:8080"
      const { data } = await axios.post(`http://${requestUrl}/user/createUserProfile`, params)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }

}

export default new API()
