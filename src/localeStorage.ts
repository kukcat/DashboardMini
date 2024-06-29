import { LOCAL_STORAGE_TYPES } from "./consts"

export const setLocalStorage = (type: LOCAL_STORAGE_TYPES, value: any): void => {
    if(!window || !window.localStorage) return

    window.localStorage.setItem(String(type), JSON.stringify(value))

}

export const getFromStorage = (type: LOCAL_STORAGE_TYPES): any => {

    if(!window || !window.localStorage) return null

    if(window.localStorage.getItem(String(type))){
        try {
            return JSON.parse(window.localStorage.getItem(String(type)) || '')
        }catch (e) {
            return null
        }
    }

    return null

}
