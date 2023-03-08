import { writable } from 'svelte/store'
import { LOCAL_STORAGE_KEYS } from '$lib/types/LocalStorage'
import { getLocalStorageValue } from '$lib/utils/localStorage'

export const initialDarkmodeState = getLocalStorageValue(LOCAL_STORAGE_KEYS.DARKMODE) ?? false

export const darkmode = writable(initialDarkmodeState)
