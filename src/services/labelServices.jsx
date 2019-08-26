import axios from 'axios'
const baseUrl = "http://34.213.106.173/api"
export  function getLabels() {
    return axios.get(baseUrl+'/noteLabels/getNoteLabelList',  {
  
      headers: {
        'Authorization': localStorage.getItem('token')
    }
  
    })
    
  }
  export  function createLabels(data) {
    return axios.post(baseUrl+'/noteLabels',data,{
  
      headers: {
        'Authorization': localStorage.getItem('token')
    }
  
    })
    
  }
  export  function UpdateLabels(data,lableId) {
    return axios.post(baseUrl+`/noteLabels/${lableId}/updateNoteLabel`,data,{
  
      headers: {
        'Authorization': localStorage.getItem('token')
      }
  
    })
    
  }
  // POST /notes/{noteId}/addLabelToNotes/{lableId}/remove
  export function RemoveNoteLabel(data){
    return axios.post(baseUrl+`/notes/${data.noteId}/addLabelToNotes/${data.lableId}/remove`,data.data,{
      headers:{
        'Authorization': localStorage.getItem('token')
      }
    })
  }
  // /notes/{noteId}/addLabelToNotes/{lableId}/add
  export  function createNoteLabels(data,noteId,lableId) {
    return axios.post(baseUrl+`/notes/${noteId}/addLabelToNotes/${lableId}/add`,data,{
  
      headers: {
        'Authorization': localStorage.getItem('token')
      }
  
    })
    
  }
  export  function showNoteByLabel(data,labelName) {
    return axios.post(baseUrl+`/notes/getNotesListByLabel/${labelName}`,data,{
  
      headers: {
        'Authorization': localStorage.getItem('token')
      }
  
    })
    
  }
  export  function delateLabel(labelId) {
    return axios.delete(baseUrl+`/noteLabels/${labelId}/deleteNoteLabel`,{
  
      headers: {
        'Authorization': localStorage.getItem('token')
      }
  
    })
    
  }
  
  
  