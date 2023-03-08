import type { ReponseCoudinary } from "$lib/types/response"
// import { VITE_API_KEY, VITE_UPLOAD_PRESET } from '$env/static/public'

import { URL } from "./URL"

const { VITE_API_KEY, VITE_UPLOAD_PRESET } = import.meta.env

export const UploadCloudinary = async (File: File): Promise<ReponseCoudinary> => {
    try {
        const body = new FormData()
        body.append('upload_preset', VITE_UPLOAD_PRESET)
        body.append('api_key', VITE_API_KEY)
        body.append('timestamp', String(Date.now()))
        body.append('file', File)

        const responsae = await fetch(URL.upload, {
            method: 'POST',
            body
        })
        const data = await responsae.json()
        return data
    } catch (error) {
        console.error(error)
        throw Error('Error upload image.')
    }
}