export const DestroyCloudinary = async ({
	publicId
}: {
	publicId: string
}): Promise<{
	result: string
}> => {
	try {
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

