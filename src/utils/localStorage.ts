import type { LOCAL_STORAGE_KEYS_TYPES } from "../types/LocalStorage"

export const getLocalStorageValue = (key: LOCAL_STORAGE_KEYS_TYPES) => {
    try {
        const stringifyLocalValue = globalThis?.window?.localStorage?.getItem(key) || 'null'
        const value = globalThis?.window?.JSON?.parse(stringifyLocalValue)
        return value
    } catch (error) {
        console.error(error)
    }
}

export const setLocalStorageValue = (key: LOCAL_STORAGE_KEYS_TYPES, value: any) => {
    globalThis?.window?.localStorage?.setItem(key, globalThis?.window?.JSON.stringify(value))
}