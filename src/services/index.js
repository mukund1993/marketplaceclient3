import axios from 'axios'
const requestUrl = "localhost:8080";
class API {
  async registerProvider1(params) {
    try {
      const { data } = await axios.post(`http://${requestUrl}/registerProvider`, params)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }

  async userLogin(params) {
    try {
      const { data } = await axios.post(`http://${requestUrl}/auth/authenticateUserLogin`, params)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }
  async verifyOTP(params) {
    try {
      const { data } = await axios.post(`http://${requestUrl}/user/verifyUserProfile`, params)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }

  async userProfileNew(params) {
    try {
      const { data } = await axios.post(`http://${requestUrl}/user/createUserProfile`, params)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }

  async fetchAllCategories() {
    try {
      const { data } = await
      axios.get(`http://localhost:3000/fetchAllCategories`)
      //axios.get(`http://${requestUrl}/gharpe/search/base/fetchAllCategories`)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }

  async searchbase() {
    try {
      const { data } = await
      axios.get(`http://localhost:3000/base`)
     //axios.get(`http://${requestUrl}/gharpe/search/base/${categoryselected}/${e.target.value}`)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }
  async fetchServicesEngagmentTerms() {
    try {
      const { data } = await
      axios.get(`http://localhost:3000/fetchServicesEngagmentTerms`)
     //axios.get(`http://${requestUrl}/gharpe/static/fetchServicesEngagmentTerms`)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }
  async fetchpaymentTypes() {
    try {
      const { data } = await
      axios.get(`http://localhost:3000/paymentTypes`)
      return data
    } catch (error) {
      const { data } = error.response
      throw data
    }   
  }
  
  
}

export default new API()
