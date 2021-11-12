import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import userReducer from './reducers/user'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    user: userReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig