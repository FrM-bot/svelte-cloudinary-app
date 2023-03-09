import { json, type RequestEvent, error } from '@sveltejs/kit'
import { DeleteImage } from '$lib/config/cloudinary'

async function deleteImage (event: RequestEvent) {
	try {
		const { publicId } = await event.request.json()
		if (publicId) {
			await DeleteImage(publicId)
			return json({
				result: 'ok'
			})
		}
		return json({
			result: 'Empty public id'
		})
	} catch (Error: any | Error) {
		console.error(Error)
		throw error(500, {
			message: Error.message as string
		})
	}
}

const DELETE = (event: RequestEvent) => deleteImage(event)
const POST = (event: RequestEvent) => deleteImage(event)


export {
	POST,
	DELETE
}
