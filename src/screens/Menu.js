import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import {Gravatar} from 'react-native-gravatar'
//import { DrawerItems } from 'react-navigation';
import commonStyles from '../commonStyles';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'

const Menu = props => {

    logout = async () => {
        delete axios.defaults.headers.common['Authorization']

        await AsyncStorage.removeItem('userData')

        //props.navigation.dispatch({ type: 'Navigation/BACK' })

        //props.screenProps.rootNavigation.navigate('Loading')
        //props.rootNavigation.navigation.navigate('Loading')
     
        //props.navigation.navigate('Root', { screen: 'Loading' })
    }

    return (
       
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>
                    InFisio
                </Text>

                <Gravatar style={styles.avatar} options={{
                        email: props.email,
                        secure: true
                    }}>

                </Gravatar>

                <View style={styles.userInfo}>
                    <View>
                        <Text style={styles.name}>
                            {props.name ||'Nome'}
                        </Text>

                        <Text style={styles.email}>
                            {props.email || 'E-mail'}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon name='sign-out' size={30} color='#800'></Icon>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <DrawerItems {...props}></DrawerItems> */}
        </ScrollView>
       
    ) 
     
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        backgroundColor: '#FFF',
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: 20,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#AAA',
        borderRadius: 30,
        margin: 10
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
        marginLeft: 10
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 15,
        marginLeft: 10,
        marginBottom: 10
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoutIcon: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10
    }
})

const mapStateToProps = (data) => {
    
    return {
        email: data.user.email,
        name: data.user.name
    }
}

//export default
export default connect(mapStateToProps, null)(Menu)