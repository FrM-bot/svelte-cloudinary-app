export const DownloadImage = async (urlImageToDownload: string) => {
    try {
        const image = await fetch(urlImageToDownload)
        const imageBlob = await image.blob()
        const blobUrl = URL.createObjectURL(imageBlob)
        return {
            blobUrl
        }
    } catch (error) {
        throw new Error('Error to get image')
    }
}