import moment from "moment";

export const empty = value => ['', null, undefined].includes(value)

export const intoStorage = (name, value, remember = false) =>
    remember ?
        localStorage.setItem(name, value) :
        sessionStorage.setItem(name, value)

export const fromStorage = name =>
    localStorage.getItem(name) || sessionStorage.getItem(name)

export const clearStorage = name => {
    localStorage.removeItem(name)
    sessionStorage.removeItem(name)
}

export const dtFormat = (datetime, format = 'lll') => 
    moment(datetime).format(format)

export const imgUrl = imagePath =>
    `${import.meta.env.VITE_API_URL}/${imagePath}`

export const isEmpty = data => 
    ['', null, undefined].includes(data)


export const setInState = (ev, state, callback) => {
        const {name, value} = ev.target
    
            callback({
                ...state,
                [name]: value,
            })
    }


export const isString = value => typeof value == 'string'

