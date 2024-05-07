import {legacy_createStore,compose, combineReducers, applyMiddleware} from "redux"


import { ContactReducer } from "./Add_Contacts/addContacts.reducer.js";
import thunk from "redux-thunk";



const rootReducer = combineReducers({
    socialManager: ContactReducer
  })

const composer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

export const store=legacy_createStore(rootReducer,composer(applyMiddleware(thunk)))