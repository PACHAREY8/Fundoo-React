import axios from 'axios';
const baseUrl="http://fundoonotes.incubation.bridgelabz.com/api"
function userRegister(data) {
  return axios.post(baseUrl +`/user/userSignUp`, data)
}
function userLogin (data) {
  return axios.post(baseUrl +`/user/login`, data)
}
function userForgot (data) {
  return axios.post(baseUrl +`/forgot`, data)
}
export { userRegister , userLogin , userForgot }
