import { writable, get } from 'svelte/store'

const initialStateTransformatiosns: Record<string, string | undefined> = {}

export const transformationsStore = writable(initialStateTransformatiosns)

export function setTransformation (key: string, transformation: string) {
    const transformations = get(transformationsStore)
    transformationsStore.set({
        ...transformations,
        [key]: transformation
    })
}
