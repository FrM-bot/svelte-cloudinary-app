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
	backgroundRemoval
} from '@cloudinary/url-gen/actions/effect'
import type { ConditionTypes } from '../types/Effect'

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
	backgroundRemoval
}

export const SimulateColorblindConditions: ConditionTypes[] = [
    'deuteranopia',
    'protanopia',
    'tritanopia',
    'tritanomaly',
    'deuteranomaly',
    'cone_monochromacy',
    'rod_monochromacy'
]
