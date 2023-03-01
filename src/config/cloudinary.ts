import { v2 as cloudinary } from 'cloudinary'
import type { UploadApiResponse, DeleteApiResponse } from 'cloudinary'
import { API_KEY, API_SECRET, CLOUD_NAME } from '$env/static/private'

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET
})

export const UploadImage = async (file: string): Promise<UploadApiResponse> => {
	try {
		const result = await cloudinary.uploader.upload(file, { folder: 'hackaton' })
		return result
	} catch (error: any) {
		console.error(error)
		throw Error('Error upload Cloudinary')
	}
}

export const DeleteImage = async (publicId: string): Promise<DeleteApiResponse> => {
	try {
		const result = await cloudinary.uploader.destroy(publicId)
		return result
	} catch (error: any) {
		console.error(error)
		throw Error('Error upload Cloudinary')
	}
}
