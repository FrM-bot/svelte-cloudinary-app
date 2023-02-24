import { json } from '@sveltejs/kit'
import type { RequestEvent } from './$types'

export function GET(event: RequestEvent) {

    console.log(event.params)

	return json(event)
}
