import React, {Fragment} from 'react'
import {View, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Text, Alert, Image} from 'react-native'
import { OutlinedTextField } from 'react-native-material-textfield'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

const Profile = props => {

    const user = useSelector(state => state.user)

    const logout = async () => {

        delete axios.defaults.headers.common['Authorization']

        await AsyncStorage.removeItem('userData')

        props.route.params.navigation.navigate('Loading')
    }

    return (
        <Fragment>
            
            <SafeAreaView style={styles.container}>

                <ScrollView>
                    
                    <View style={styles.containerAvatar}>
                        <View style={styles.avatar}>
                            {user.urlImage ? 
                            <Image source={{uri: user.urlImage}} style={styles.avatarImage}/>
                            : null
                            }
                            
                        </View>
                    </View>

                    <View style={styles.input}>
                        <OutlinedTextField
                            value={user.nome}
                            label="Usuário"
                            disabled={true}
                            baseColor={'#2c2b49'}
                        />
                    </View>

                    <View style={styles.input}>
                        <OutlinedTextField
                            value={user.email}
                            label="E-mail"
                            disabled={true}
                            baseColor={'#2c2b49'}
                        />
                    </View>

                    
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => logout()}>

                            <View style={styles.buttonIcon}>
                                <Icon name='sign-out'size={25} color='red'></Icon>
                                <Text style={styles.text}>Sair</Text> 
                            </View>

                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </SafeAreaView>
            
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10
    },
    buttonIcon: {
        flexDirection: 'row',
    },
    text: {
        paddingLeft: 5,
        paddingTop: 3
    },
    input: {
        marginTop: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 50
    },
    containerAvatar: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    avatar: {
        flexDirection: 'row'
    },
    avatarImage: {
        width: 125, 
        height: 125,
        borderRadius: 100
    }
})

export default Profile