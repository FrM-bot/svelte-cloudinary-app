import { writable } from 'svelte/store'
import { LOCAL_STORAGE_KEYS } from '../types/LocalStorage'
import { getLocalStorageValue } from '../utils/localStorage'

export interface Image {
    url: string
    alt: string
    publicId: string
    assetId: string
    versionId: string
}

const initialState: Image = getLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE) ?? {
    url: '',
    alt: '',
    publicId: '',
    assetId: '',
    versionId: ''
}

export const imageToEdit = writable(initialState)
