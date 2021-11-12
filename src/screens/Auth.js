import React, {Fragment, useState, useEffect} from 'react'
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, Alert} from 'react-native'
import commonStyles from '../commonStyles'
import backgroundImage from '../../assets/imgs/login5.png'
import AuthInput from '../components/AuthInput'
import axios from 'axios'
import { server, showError } from '../common'
import AsyncStorage from '@react-native-community/async-storage'
import {connect} from 'react-redux'
import {login, setImageAuth} from '../store/actions/user'
import Loading from '../components/Loading'
import QRCodeScanner from "react-native-qrcode-scanner"
import { RNCamera } from 'react-native-camera'
import { COLOR } from 'react-native-material-ui'

const Auth = (props) => {

    const [state, setState] = useState({
        nome: '',
        email: '',
        password: '',
        loading: false
    })

    const [readQrCode, setReadQrCode] = useState(false)
    const [qrCodeReaded, setQrCodeReaded] = useState(false)

    const signin = () => {
        try {

            setState({...state, loading: true})

            axios.post(`${server}/signin`, {
                email: state.email,
                password: state.password
            }).then(async res => {
                
                if(!res.data.conteudo.token) {

                    setState({...state, loading: false})
                    Alert.alert('Ops', 'Algo deu errado =(')
                    return
                }
    
                 axios.defaults.headers.common['Authorization'] = `bearer ${res.data.conteudo.token}`
    
                 await AsyncStorage.setItem('userData', JSON.stringify(res.data.conteudo))

                 props.login(res.data.conteudo)

                 props.setImageAuth()
    
                 setState({...state, loading: false})
    
                 props.navigation.navigate('Home')
            }).catch(err => {
                
                setState({...state, loading: false})
                showError(err)
            })

        } catch (err) {

            setState({...state, loading: false})
            showError(err)
        }
    }

    const signinOrSignup = () => {
        signin()
    }

    useEffect(() => {

        if (qrCodeReaded) {
            signin()
        }

        return () => {
        }        
    }, [qrCodeReaded])

    const renderQrCode = (props) => {

        return (
            <Fragment>
                
                <View style={styles.container}>

                    <QRCodeScanner
                        onRead={ret => {
                            
                            let data = JSON.parse(ret.data)

                            setState({...state, email: data.email, password: data.password})
                            setQrCodeReaded(true)
                            setReadQrCode(false)
                        }}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        bottomContent={
                            <TouchableOpacity style={styles.buttonTouchable}
                            onPress={() => setReadQrCode(false)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        }
                    />

                </View>

            </Fragment>
        )
    }

    const renderLogin = (props) => {

        const validations = []

        validations.push(state.email && state.email.includes('@'))
        validations.push(state.password)

        const validForm = validations.reduce((all, v) => all && v)

        return (
            <Fragment>
                <ImageBackground source={backgroundImage} style={styles.background}>
                
                    <View style={styles.formContainer}>
                        
                        <AuthInput icon='at' placeholder='E-Mail' style={styles.input}
                            value={state.email} onChangeText={email => setState({...state, email})}>
                        </AuthInput>

                        <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha' style={styles.input}
                            value={state.password} onChangeText={password => setState({...state, password})}>
                        </AuthInput>

                        <TouchableOpacity onPress={signinOrSignup} disabled={!validForm || state.loading}>
                            <View style={[styles.button, (!validForm || state.loading) ? {backgroundColor: '#AAA'} : {}]}>
                                <Text style={styles.buttonText}>
                                    Entrar
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={{padding: 10}} 
                        onPress={() => {
                            setReadQrCode(!readQrCode)
                            setQrCodeReaded(false)
                        }}>
                        <Text style={styles.buttonText}>
                            Login com QR CODE
                        </Text>
                    </TouchableOpacity>

                    {state.loading ? 
                        <View style={styles.containerLoading}>
                            <Loading/>
                        </View>
                        : null
                    }

                </ImageBackground>
            </Fragment>
        )
    }

    

    return (
        <Fragment>
          
            {readQrCode ? 
                renderQrCode() : renderLogin()
            }
            
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black"
      },
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 60,
        fontWeight: 'bold'
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        marginTop: 60,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: COLOR.blue800,
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
    containerLoading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    buttonTouchable: {
        padding: 16
    }
})


const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(login(user)),
        setImageAuth: () => dispatch(setImageAuth())
    }
}

export default connect(null, mapDispatchToProps)(Auth)