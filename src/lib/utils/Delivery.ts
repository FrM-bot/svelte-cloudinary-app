import { format, quality, density } from '@cloudinary/url-gen/actions/delivery'

export const DeliveryCloudinary = {
    format,
    quality,
    density
}

export const OptionsDeliveryFromat = [
    { name: 'JPG', value: 'jpg' },
    { name: 'PNG', value: 'png' },
    { name: 'GIF', value: 'gif' },
    { name: 'WebP', value: 'webp' },
    { name: 'BMP', value: 'bmp' },
    { name: 'JPEG 2000', value: 'jp2' },
    { name: 'JPEG XR', value: 'jxr' }
]

export const OptionsDeliveryQuality = [
    { name: 'Auto', value: 'auto' },
    { name: 'Auto Best', value: 'auto:best' },
    { name: 'Auto Good', value: 'auto:good' },
    { name: 'Auto Eco', value: 'auto:eco' },
    { name: 'Auto Low', value: 'auto:low' },
    { name: '90', value: '90' },
    { name: '80', value: '80' },
    { name: '70', value: '70' },
    { name: '60', value: '60' },
    { name: '50', value: '50' }
]