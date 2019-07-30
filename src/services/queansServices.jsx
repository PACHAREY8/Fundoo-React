import axios from 'axios'
const baseUrl = "http://34.213.106.173/api"
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
