import React, {Fragment} from 'react'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Auth from './screens/Auth'
import AuthOrApp from './screens/AuthOrApp'
import Agenda from './screens/Agenda'
import About from './screens/About'
import Detail from './screens/Detail'
import Barra from './components/Barra'
import Profile from './screens/Profile'
import { COLOR } from 'react-native-material-ui'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createMaterialBottomTabNavigator()

const Stack = createStackNavigator()

  class NestedMyStackNavigator extends React.Component {
    
    constructor(props)  {
        super(props)
    }

    render() {
        return (
            <Fragment>
                
                <NavigationContainer >
                    
                    <Stack.Navigator headerMode={'screen'} initialRouteName={'Loading'}
                        screenOptions={{
                            headerStyle: {
                            backgroundColor: COLOR.blue800,
                            },
                            headerTintColor: '#FFF',
                            headerTitleStyle: {
                            fontWeight: 'bold',
                            },
                        }}
                    >
                        
                        <Stack.Screen 
                            name="Agenda" 
                            component={NestedNavigatorWrapper} 
                            options={({navigation}) => (
                                { 
                                    headerShown: true, 
                                    headerTitle: () => <Barra nav={this.props} {...navigation} />
                                })}
                        />
                        <Stack.Screen 
                            name="Sessão" 
                            component={Detail}
                            options={({navigation}) => (
                                { 
                                    headerShown: true, 
                                    headerTitle: () => <Barra nav={this.props} {...navigation} />
                                })}
                        />
                        <Stack.Screen 
                            name="Perfil" 
                            component={Profile} 
                            options={({navigation}) => (
                                { 
                                    headerShown: true, 
                                    headerTitle: () => <Barra nav={this.props} {...navigation} />
                                })}
                        />
                       
                    </Stack.Navigator>
                </NavigationContainer>
            </Fragment>
        )
    }
}

class NestedNavigatorWrapper extends React.Component {
    
    constructor(props)  {
        super(props)
    }

    render() {

        return (
            <Fragment>
                   
                    <Tab.Navigator
                    initialRouteName="Agenda"
                    barStyle={{backgroundColor: COLOR.blue800}}
                    >
                        <Tab.Screen
                            name="Agenda"
                            component={Agenda}
                            options={{
                            tabBarLabel: 'Agenda',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="calendar" color={color} size={26} />
                            ),
                            }}
                        />
                        <Tab.Screen
                            name="Sobre"
                            component={About}
                            options={{
                            tabBarLabel: 'Sobre',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="information" color={color} size={26} />
                            ),
                            }}
                        />    
                    </Tab.Navigator> 

            </Fragment>
        )
    }
}

const MainRoutes = {
    Loading: {
        name: 'Loading',
        screen: AuthOrApp
    },
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: NestedMyStackNavigator
    }
}


const MainNavigator = createSwitchNavigator(MainRoutes, {initialRouteName: 'Loading'})

const App = createAppContainer(MainNavigator)

export default App