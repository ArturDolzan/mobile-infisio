import React, {Fragment, useEffect} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native'
import commonStyles from '../commonStyles'
import { COLOR } from 'react-native-material-ui'
import Icon from 'react-native-vector-icons/FontAwesome'
import favicon from '../../assets/imgs/favicon.png'
import { connect, useSelector } from 'react-redux'
import { alterarConnected } from '../store/actions/user'

import NetInfo from "@react-native-community/netinfo"

const Barra = props => {

    const user = useSelector(state => state.user)
    
    useEffect(() => {

        const unsubscribe = NetInfo.addEventListener(data => {
            props.alterarConnected(data.isConnected)
        })

        return () => {
            unsubscribe()
        }        
    }, [])

    const navegarPerfil = () => {
       
       props.navigate('Perfil', props.nav)
    }

    return (
        <Fragment>

            {!user.isConnected ? 
            <View style={styles.offlineContainer}>
                <Text style={styles.offlineText}>Sem conexão de internet =(</Text>
            </View>
            : null
            }
            

            <View style={styles.container}>
                
                <Image source={favicon} style={styles.imageInfisio}/>
                <Text style={styles.title}>
                    {user.nome || 'Não identificado'}
                </Text>
                <TouchableOpacity onPress={() => navegarPerfil()}>
                    <View style={styles.iconUser}>
                    
                        {user.urlImage ?
                            <Image source={{uri: user.urlImage}} style={styles.imageAvatar}/> :
                            <Icon name='user'size={25} color='#FFF' style={{paddingTop: 10}}></Icon> 
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
   container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imageInfisio: {
        width: 35, 
        height: 35, 
        tintColor: "white",
        marginTop: 8
    },
    imageAvatar: {
        width: 45, 
        height: 45,
        borderRadius: 50
    },
    title: {
        backgroundColor: COLOR.blue800,
        color: '#FFF',
        fontFamily: commonStyles.fontFamily,
        fontSize: 24,
        paddingTop: 10,
        padding: 10
    },
    iconUser: {
        marginTop: 5
    },
    offlineContainer: {
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: Math.round(Dimensions.get('window').width) - 120,
        position: 'absolute',
        top: 55,
        borderRadius: 60,
        left: 35
      },
      offlineText: { 
        color: '#fff'
      }
})

const mapDispatchToProps = dispatch => {
    return {
        alterarConnected: user => dispatch(alterarConnected(user))
    }
}

export default connect(null, mapDispatchToProps)(Barra)