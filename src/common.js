import {Alert, Platform} from 'react-native'
import NetInfo from "@react-native-community/netinfo"

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'https://www.infisio.com.br/api'

function showError(err) {
   
    let error = err

    NetInfo.fetch().then(state => {
        
        if (!state.isConnected) {
            error = `Sem conexão de internet =(`
        }

        if (err.response) {
            if (err.response.data) {
                error = err.response.data.mensagem || err.response.data
            }
        }
    
        Alert.alert('Ops!', `${error}`)
    })
}

export {server, showError}