import axios from 'axios'
const baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api"
export  function QuesnAnsCreate(data) {
  return axios.post(baseUrl+`/questionAndAnswerNotes/addQuestionAndAnswer`, data, {
    headers: {
      'Authorization': localStorage.getItem("token")
    }
  })
}
export  function getQuesnAns(id) {
    console.log(id);
    
    return axios.get(baseUrl+`/notes/${id}/questionAndAnswerNotes`, {
      headers: {
        'Authorization': localStorage.getItem("token")
  
      }
    })
  }
  export  function likeQueAns(data,parentId) {    
    return axios.post(baseUrl+`/questionAndAnswerNotes/like/${parentId}`,data, {
      headers: {
        'Authorization': localStorage.getItem("token")
  
      }
    })
  }
