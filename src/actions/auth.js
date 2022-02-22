import moment from "moment"
import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"
import { eventLogout } from "./events"

export const startLogin = (email, password) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('auth', {email, password}, 'POST')
        const body = await resp.json()
        if (body.ok) {
            localStorage.setItem('calendar-token', body.token)
            localStorage.setItem('calendar-token-idate', moment().format('lll'))
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else if(body?.errors && (Object.keys(body?.errors).length > 0)) {
            const tipoError = Object.values(body.errors)[0].msg
            Swal.fire('Error', tipoError, 'error')
        }else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startRegister = (email, password, name) => {
        return async(dispatch) => {
            const resp = await fetchSinToken('auth/register', {name, email, password}, 'POST')
            const body = await resp.json()
            if (body.ok) {
                localStorage.setItem('calendar-token', body.token)
                localStorage.setItem('calendar-token-idate', moment().format('lll'))
                dispatch(login({
                    uid: body.uid,
                    name: body.name
                }))
            }else if(body?.errors && (Object.keys(body?.errors).length > 0)) {
                const tipoError = Object.values(body.errors)[0].msg
                Swal.fire('Error', tipoError, 'error')
            }else {
                Swal.fire('Error', body.msg, 'error')
            }
        }
}

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/renew')
        const body = await resp.json()
        if (body.ok) {
            localStorage.setItem('calendar-token', body.token)
            localStorage.setItem('calendar-token-idate', moment().format('lll'))
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else {
            dispatch(checkingFinish())
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

const checkingFinish = () => ({type: types.authCheckingFinish})

export const startLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('calendar-token')
        localStorage.removeItem('calendar-token-idate')
        dispatch(eventLogout())
        dispatch(logout())
    }
}

const logout = () => ({type: types.authLogout})