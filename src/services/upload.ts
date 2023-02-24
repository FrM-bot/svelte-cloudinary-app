import type { ReponseCoudinary } from "../types/response"

const URL = {
    // upload: '/api/image'
    upload: 'https://api.cloudinary.com/v1_1/dxkry5nri/image/upload'
}

export const UploadCloudinary = async (File: File): Promise<ReponseCoudinary> => {
    try {
        const body = new FormData()
        body.append('upload_preset', 'ml_default')
        body.append('api_key', '897387432799254')
        body.append('file', File)
        body.append('timestamp', String((Date.now() / 1000)))

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