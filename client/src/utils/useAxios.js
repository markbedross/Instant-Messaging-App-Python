import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import {AuthContext} from '../context/Auth/AuthContext'

const baseURL = "http://127.0.0.1:8000/api"

export const useAxios = () => {
    const {tokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${tokens?.access}`
        }
    })

    // axiosInstance.interceptors.request.use(async req => {
    //     const user = jwtDecode(tokens.access)
    //     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
        
    //     if(isExpired) return req

    //     const res = await axios.post(`${baseURL}/token/refresh/`, {
    //         refresh: tokens.refresh
    //     })
    //     localStorage.setItem("tokens", JSON.stringify(res.data))
    //     // localStorage.setItem("tokens", JSON.stringify(res.data))

    //     setTokens(res.data)
    //     setUser(jwtDecode(res.data.access))

    //     req.headers.Authorization = `Bearer ${res.data.access}`
    //     return req
    // })

    return axiosInstance
}