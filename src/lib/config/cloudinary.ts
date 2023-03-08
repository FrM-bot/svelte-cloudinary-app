import { v2 as cloudinary } from 'cloudinary'
import type { DeleteApiResponse } from 'cloudinary'
import { VITE_API_KEY, API_SECRET, VITE_CLOUD_NAME } from '$env/static/private'

cloudinary.config({
	cloud_name: VITE_CLOUD_NAME,
	api_key: VITE_API_KEY,
	api_secret: API_SECRET
})

export const DeleteImage = async (publicId: string): Promise<DeleteApiResponse> => {
	try {
		const result = await cloudinary.uploader.destroy(publicId)
		return result
	} catch (error: any) {
		console.error(error)
		throw Error('Error upload Cloudinary')
	}
}
