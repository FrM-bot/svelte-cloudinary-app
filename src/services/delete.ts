import { URL } from './URL'
import type { Image } from '../store/image'


export const DestroyCloudinary = async ({
	publicId
}: {
	publicId: string
}): Promise<{
	result: 'ok'
}> => {
	// console.log(publicId, signature, timestamp)
	try {
		// const body = new FormData()
		// body.append('public_id', publicId)
		// body.append('signature', signature)
		// body.append('api_key', '897387432799254')
		// body.append('timestamp', String(timestamp))

		// body.append('token', token)

		const responsae = await fetch(`/api/${publicId}`, {
			method: 'DELETE',
            body: JSON.stringify({ publicId })
		})
		const data = await responsae.json()
		return data
	} catch (error) {
		console.error(error)
		throw Error('Error upload image.')
	}
}


export const DestroyCloudinaryByToken = async ({
	token
}: {
	token: string
}): Promise<{
	result: 'ok'
}> => {
	// console.log(publicId, signature, timestamp)
	try {
		// const body = new FormData()
		// body.append('public_id', publicId)
		// body.append('signature', signature)
		// body.append('api_key', '897387432799254')
		// body.append('timestamp', String(timestamp))

		// body.append('token', token)

		const responsae = await fetch(URL.destroyByToken, {
            headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ token })
		})
		const data = await responsae.json()
		return data
	} catch (error) {
		console.error(error)
		throw Error('Error upload image.')
	}
}
