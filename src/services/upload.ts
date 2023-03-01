import type { ReponseCoudinary } from "../types/response"
import { URL } from "./URL"

export const UploadCloudinary = async (File: File): Promise<ReponseCoudinary> => {
    try {
        const body = new FormData()
        body.append('upload_preset', 'ml_default')
        body.append('api_key', '897387432799254')
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