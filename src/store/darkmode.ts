import { writable } from 'svelte/store'

export const initialDarkmodeState = globalThis?.window?.localStorage?.getItem('darkmode') === 'true'

export const darkmode = writable(initialDarkmodeState)

darkmode.set(initialDarkmodeState)

