import { json, type RequestEvent, error } from '@sveltejs/kit'
import { DeleteImage } from '../../../../config/cloudinary'

export async function DELETE(event: RequestEvent) {
	try {
		const { publicId } = await event.request.json()
		await DeleteImage(publicId)
		return json({
			result: 'ok'
		})
	} catch (Error: Error | any) {
		console.error(Error)
		throw error(500, {
			message: Error.message
		})
	}
}
export async function POST(event: RequestEvent) {
	try {
		const { publicId } = await event.request.json()
		if (publicId) {
			await DeleteImage(publicId)
		}
		return json({
			result: 'ok'
		})
	} catch (Error: Error | any) {
		console.error(Error)
		throw error(500, {
			message: Error.message
		})
	}
}
