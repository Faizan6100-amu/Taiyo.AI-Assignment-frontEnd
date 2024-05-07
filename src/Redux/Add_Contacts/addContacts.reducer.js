
import { ADD_CONTACT_ERROR, ADD_CONTACT_SUCCESS } from "./addContacts.actiontype.js"

const initialState={
    contacts:[],
    error:false
}

export const ContactReducer=(state=initialState,{type,payload})=>{
    switch(type){
          case ADD_CONTACT_SUCCESS: {
            return {
              ...state,
              contacts:[...state.contacts,payload]
            };
          }
          case ADD_CONTACT_ERROR: {
            return {
              ...state,
              error: true,
            };
          }
        default:{
            return state
        }
    }
}