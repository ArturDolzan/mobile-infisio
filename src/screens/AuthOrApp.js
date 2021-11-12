import React, {useEffect} from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'
import axios from 'axios';
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import {login, setImageAuth} from '../store/actions/user'
import { showError } from '../common'

const AuthOrApp = props => {

    useEffect( () => {

        AsyncStorage.getItem('userData')
        .then(res => {
            
            const userData = JSON.parse(res) || {}

            if(userData.token) {
                axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`

                loginApp(userData)

                props.setImageAuth()

                props.navigation.navigate('Home')
            } else {
                props.navigation.navigate('Auth')
            }
        }).catch(err => {
            showError(err)
        })
    
    }, []);

    const loginApp = (user) => {
        props.onLogin(user)
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large'></ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user)),
        setImageAuth: () => dispatch(setImageAuth())
    }
}

export default connect(null, mapDispatchToProps)(AuthOrApp)