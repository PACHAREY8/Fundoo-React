import axios from 'axios'
const baseUrl = "http://34.213.106.173/api"
export  function getTrashNotes() {
    return axios.get(baseUrl+`/notes/getTrashNotesList`, {
      headers: {
        'Authorization': localStorage.getItem("token")
  
      }
    })
  }
  export  function getArchiveNotes() {
    return axios.get(baseUrl+`/notes/getArchiveNotesList`, {
      headers: {
        'Authorization': localStorage.getItem("token")
  
      }
    })
  }
export  function getReminderNotes() {
  return axios.get(baseUrl+`/notes/getReminderNotesList`, {
    headers: {
      'Authorization': localStorage.getItem("token")
    }
  })
}
