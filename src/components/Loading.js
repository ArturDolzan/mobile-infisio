import React from 'react'
import {ActivityIndicator} from 'react-native'

export default props => {
    return (
        <ActivityIndicator size={props.size || 'large'}></ActivityIndicator>
    )
}