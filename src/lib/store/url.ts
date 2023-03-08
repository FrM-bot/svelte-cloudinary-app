import { writable, get } from 'svelte/store'
import { imageToEdit } from './image'

const initialUrlState = get(imageToEdit).url

export const urlState = writable(initialUrlState)
