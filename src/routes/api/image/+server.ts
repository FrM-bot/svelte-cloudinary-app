import { json, error as Error } from '@sveltejs/kit'
import type { RequestEvent } from './$types'
import fs from 'node:fs'
import { UploadImage } from '../../../config/cloudinary'

import path from 'node:path'

export async function POST(event: RequestEvent) {
	try {
		const body = await event.request.formData()

		const file = body.get('file') as File

		const data = await file.arrayBuffer()

		const dataView = new DataView(data)

		const { pathname } = new URL('../', import.meta.url)

		const pathnameDest = path.join(pathname.slice(1), 'images')

		if (!fs.existsSync(pathnameDest)) {
			fs.mkdirSync(pathnameDest)
		}

		const pathFile = path.join(pathnameDest, file.name)

		fs.writeFileSync(pathFile, dataView, { encoding: 'binary' })

		const result = await UploadImage(pathFile)

		fs.unlinkSync(pathFile)

		return json(result)
	} catch (error: Error | any) {
		console.error(error)
		return Error(500, error)
	}
}
