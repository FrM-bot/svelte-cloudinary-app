import { EffectCloudinary } from '$lib/utils/Effect'

export type Effect = keyof typeof EffectCloudinary

export type ForegroundObjectValue =
	| 'airplane'
	| 'bus'
	| 'dining_table'
	| 'sheep'
	| 'bicycle'
	| 'car'
	| 'dog'
	| 'sofa'
	| 'bird'
	| 'cat'
	| 'horse'
	| 'train'
	| 'boat'
	| 'chair'
	| 'person'
	| 'tv'
	| 'bottle'
	| 'cow'
	| 'potted_plant'
	| 'motorbike'

export type ConditionTypes =
	| 'deuteranopia'
	| 'protanopia'
	| 'tritanopia'
	| 'tritanomaly'
	| 'deuteranomaly'
	| 'cone_monochromacy'
	| 'rod_monochromacy'
