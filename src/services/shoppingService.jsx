import axios from 'axios'
const baseUrl = "http://34.213.106.173/api"
export  function userService() {
    return axios.get(baseUrl+'/user/service',{
    })
    
  }
  export  function addToCart(data) {
    return axios.post(baseUrl+'/productcarts/addToCart',data,{
    })
    
  }
  // /productcarts/userCartList
  export  function userCartDetails() {    
    return axios.get(baseUrl+`/productcarts/myCart`, {
      headers: {
        'Authorization': localStorage.getItem("token")
  
      }
    })
  }


