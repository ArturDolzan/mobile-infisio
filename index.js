/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native'
import App from './src/Navigator'
import {name as appName} from './app.json'
import {Provider} from 'react-redux'
import storeConfig from './src/store/storeConfig.js'

import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui'

const uiTheme = {
  palette: {
    primaryColor: COLOR.blue800,
    secondaryColor: '#f44336'
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
}


const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <ThemeContext.Provider value={getTheme(uiTheme)}>
            <App/>
        </ThemeContext.Provider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux)
