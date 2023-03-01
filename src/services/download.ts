import { URL } from './URL'
import type { Image } from '../store/image'


const API_KEY = '897387432799254'

// import type { ReponseCoudinary } from "../types/response"
//?timestamp=173719931&asset_id=62c2a18d622be7e190d21df8e05b1416&version_id=26fe6d95df856f6ae12f5678be94516a&signature=c9937fe93eb655ce04633034f921b83969eff9aa&api_key=323127161127519

export const DownloadImageCloudinary = async ({
	assetId,
	versionId
}: {
	assetId: string
	versionId: string
}): Promise<any> => {
	try {
		// const body = new FormData()
		// body.append('public_id', publicId)
		// body.append('signature', signature)
		// body.append('api_key', '')
		// body.append('timestamp', String(timestamp))

		// body.append('token', token)

		const responsae = await fetch('/api/image', {
            headers: {
				'Content-Type': 'application/json'
			},
            method: 'POST',
            body: JSON.stringify({ assetId, versionId })
        })
		const data = await responsae.json()
		return data
	} catch (error) {
		console.error(error)
		throw Error('Error upload image.')
	}
}
