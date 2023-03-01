import { Cloudinary } from "@cloudinary/url-gen";

export const cloudinary = new Cloudinary({
    cloud: {
        cloudName: 'dxkry5nri'
    },
    url: {
        secure: true
    }
})