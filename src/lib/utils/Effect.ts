import {
	pixelate,
	grayscale,
	oilPaint,
	blur,
	blackwhite,
	negate,
	sepia,
	vignette,
	simulateColorBlind,
	redEye,
	colorize,
	backgroundRemoval,
	vectorize,
	removeBackground,
	cartoonify,
	dither,
	assistColorBlind
} from '@cloudinary/url-gen/actions/effect'

import {
	Actions
} from '@cloudinary/url-gen'

// console.log(Actions.Delivery.density(2))

import type { ConditionTypes } from '$lib/types/Effect'
export const EffectCloudinary = {
	pixelate,
	grayscale,
	oilPaint,
	blur,
	blackwhite,
	negate,
	sepia,
	vignette,
	simulateColorBlind,
	redEye,
	colorize,
	backgroundRemoval,
	vectorize,
	removeBackground,
	cartoonify,
	dither,
	assistColorBlind
}
// console.log()
export const SimulateColorblindConditions: ConditionTypes[] = [
    'deuteranopia',
    'protanopia',
    'tritanopia',
    'tritanomaly',
    'deuteranomaly',
    'cone_monochromacy',
    'rod_monochromacy'
]
