import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_IMAGE, USER_CONNECTED } from "./actionTypes"
import axios from "axios"
import { server } from '../../common'

export const login = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const alterarImageAuth = (urlImage) => {
    return {
        type: USER_IMAGE,
        payload: urlImage
    }
}

export const alterarConnected = (connected) => {
    return {
        type: USER_CONNECTED,
        payload: connected
    }
}

export const setImageAuth = () => (
    (dispatch, getState) => {

        if (!getState().user.id) return

        let route = `${server}/contasTenant/imagem/${getState().user.id}`
        
        if (!getState().user.master) {
            route = `${server}/agentes/imagem/${getState().user.id}`
        }

        axios.get(route)
        .then(ret => {

            if (ret.status !== 200) {
                return
            }
            
            if (ret.data.conteudo.caminho !== '') {
                dispatch(alterarImageAuth(`${server}/${ret.data.conteudo.caminho}`)) 
            }

        })
        .catch(error => {
            return
        })
    }
 )