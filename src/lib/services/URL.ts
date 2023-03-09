const  { VITE_CLOUD_NAME : cloudName} = import.meta.env

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`

export const URL = {
	upload: `${baseUrl}/image/upload`,
    destroy: `${baseUrl}/image/destroy`,
    destroyByToken: `${baseUrl}/delete_by_token`,
    download: `${baseUrl}/download_backup`
}
