/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'
import Auth from './src/screens/Auth'

const App: () => React$Node = () => {
  return (
    <Fragment>
       <Auth/> 
    </Fragment>
  )
}

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
})

export default App