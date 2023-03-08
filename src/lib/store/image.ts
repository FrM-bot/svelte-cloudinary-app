import { writable } from 'svelte/store'
import { LOCAL_STORAGE_KEYS } from '$lib/types/LocalStorage'
import { getLocalStorageValue } from '$lib/utils/localStorage'
import type { Image } from '$lib/types/Image'

export const initialImageState: Image = {
    alt: '',
    assetId: '',
    publicId: '',
    url: '',
    versionId: ''
}

const imageState: Image = getLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE) ?? initialImageState

export const imageToEdit = writable(imageState)
