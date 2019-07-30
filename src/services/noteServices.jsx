import axios from 'axios'
const baseUrl = "http://34.213.106.173/api"
export  function createNote(data) {
  return axios.post(baseUrl+`/notes/addNotes`, data, {
    headers: {
      'Authorization': localStorage.getItem("token")
    }
  })
}
export function getNotes() {
  return axios.get(baseUrl + '/notes/getNotesList', {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  })
}
export function updateTitle(data) {
  return axios.post(baseUrl+`/notes/updateNotes`, data, {
    headers: {
      "Authorization": localStorage.getItem("token")
    },
  })
}
export function updateDescription(data) {
  return axios.post(baseUrl+`/notes/updateNotes`, data, {
    headers: {
      "Authorization": localStorage.getItem("token")
    },
  })
}
export function archiveNote(data) {
  return axios.post(baseUrl+'/notes/archiveNotes', data, {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  })
}
export function colorChange(data) {
  return axios.post(baseUrl+'/notes/changesColorNotes', data, {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  })
  
}
export function searchUserList(data) {
  return axios.post(baseUrl+'/user/searchUserList', data, {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  })
  
}
export function setremainder(data){
  return axios.post(baseUrl+'/notes/addUpdateReminderNotes',data,{
     headers: {
      "Authorization": localStorage.getItem("token")
    }
    
  })
}
export function removeremainder(data){
  return axios.post(baseUrl+'/notes/removeReminderNotes',data,{
     headers: {
      "Authorization": localStorage.getItem("token")
    }
    
  })
}
export function trashNotes(formData){
  return axios.post(baseUrl+'/notes/trashNotes',formData,{
     headers: {
      "Authorization": localStorage.getItem("token")
    }
    
  })
}
export  function profilePicUpload(data){
  return axios.post(baseUrl+'/user/uploadProfileImage',data,{
     headers: {
      "Authorization": localStorage.getItem("token")
    }
    
  })
}
export  function DeleteNotePermanent(data) {
  return axios.post(baseUrl+'/notes/deleteForeverNotes',data, {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  })
  
}
export function CollabeNotes(data){
  return axios.post(baseUrl+'/notes/{id}/AddcollaboratorsNotes',data,{
    headers:{
      "Authorization": localStorage.getItem("token")
    }
  })
}
export function getUserList(data){
  return axios.get(baseUrl+'/user',{
    headers:{
      "Authorization": localStorage.getItem("token")
    }
  })
}
export function Addcollaborators(data,noteId){
  return axios.post(baseUrl+`/notes/${noteId}/AddcollaboratorsNotes`,data,{
    headers:{
      "Authorization": localStorage.getItem("token")
    }
  })
}
