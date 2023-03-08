// import { VITE_CLOUD_NAME } from "$env/static/public"
import { Cloudinary } from "@cloudinary/url-gen"
const  { VITE_CLOUD_NAME : cloudName} = import.meta.env

export const cloudinary = new Cloudinary({
    cloud: {
        cloudName
    },
    url: {
        secure: true
    }
})