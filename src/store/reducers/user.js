import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_IMAGE, USER_CONNECTED } from "../actions/actionTypes"

const initialState = {
    nome: null,
    email: null,
    password: null,
    id: null,
    idtenant: null,
    master: null,
    urlImage: ``,
    isConnected: true
}

const reducer = (state = initialState, action) => {
    
    switch(action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                nome: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                id: action.payload.id,
                idtenant: action.payload.idtenant,
                master: action.payload.master
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                nome: null,
                email: null,
                password: null,
                id: null,
                idtenant: null,
                master: null
            }

        case USER_IMAGE:
          
            return {
                ...state,
                urlImage: action.payload
            }

        case USER_CONNECTED:
            
            return {
                ...state,
                isConnected: action.payload
            }

        default: 
            return state
    }
}

export default reducer