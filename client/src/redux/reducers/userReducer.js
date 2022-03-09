const defaultState = {
    currentUser: null,
    loaded: false
}

const USER_LOGGED_IN = 'USER_LOGGED_IN'
const USER_ATTEMPT_LOGOUT = 'USER_ATTEMPT_LOGOUT'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
const USER_ATTEMPT_LOGIN = 'USER_ATTEMPT_LOGIN'

export const loggedIn = (user) => {
    return {
        type: USER_LOGGED_IN,
        user
    }
}

export const logout = (dispatch, getState) => {
    dispatch({ type: USER_ATTEMPT_LOGOUT })
    fetch('/api/v1/users/logout')
        .then(() => {
            dispatch({ type: USER_LOGGED_OUT })
        })
}

export const checkUser = (dispatch, getState) => {
    dispatch({ type: USER_ATTEMPT_LOGIN })
    fetch('/api/v1/users/current')
        .then((res) => {
            if (res.ok){return res.json()}
            dispatch({ type: USER_LOGGED_OUT })
        })
        .then((data) => {
            dispatch(loggedIn(data))
        })
}

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                currentUser: action.user,
                loaded: true
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                currentUser: null,
                loaded: true
            }
        default:
            return state
    }
}