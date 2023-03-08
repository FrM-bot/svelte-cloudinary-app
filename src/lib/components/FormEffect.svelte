<script lang="ts">
	import { imageToEdit } from '../store/image'
	import { setTransformation } from '../store/transformations'
	import type { ConditionTypes, Effect, ForegroundObjectValue } from '../types/Effect'
	import { cloudinary } from '../utils/cloudinary'
	import { EffectCloudinary, SimulateColorblindConditions } from '../utils/Effect'
	import { FormatString, TextFormating } from '../utils/FromatingString'
	import { getDataToFrom } from '../utils/GetFormData'
	import Button from './Button.svelte'
	import Card from './Card.svelte'
	import Fieldset from './Fieldset.svelte'
	import Input from './Input.svelte'
	import Select from './Select.svelte'


	let optionEffetSelected: Effect

	let ForegroundObject = [
		'airplane',
		'bus',
		'dining_table',
		'sheep',
		'bicycle',
		'car',
		'dog',
		'sofa',
		'bird',
		'cat',
		'horse',
		'train',
		'boat',
		'chair',
		'person',
		'tv',
		'bottle',
		'cow',
		'potted_plant',
		'motorbike'
	]

	const checkboxKeys = ['redEye', 'negate', 'grayscale', 'vectorize', 'removeBackground', 'assistColorBlind']

	let objectsToConserv = [] as ForegroundObjectValue[]

	const handlerEffect = (
		event: Event & {
			readonly submitter: HTMLElement | null
		} & {
			currentTarget: EventTarget & HTMLFormElement
		}
	) => {
		event.preventDefault()
		const data = getDataToFrom(event.currentTarget)
		const { value, effect, condition, color, apply } = data as unknown as {
			value: number
			effect: Effect
			condition: ConditionTypes
			color: string
			apply: 'on' | undefined
		}
		if (!effect) {
			return
		}
		if (checkboxKeys.includes(effect) && !apply) {
			return
		}
		const resultImage = cloudinary.image($imageToEdit.publicId)
		if (effect === 'simulateColorBlind') {
			resultImage.effect(EffectCloudinary[effect]().condition(condition))
		} else if (effect === 'colorize') {
			resultImage.effect(EffectCloudinary[effect](value ?? undefined).color(color))
		} else if (effect === 'backgroundRemoval') {
			resultImage.effect(EffectCloudinary[effect]().hints(objectsToConserv))
		} else {
			resultImage.effect(EffectCloudinary[effect](value ?? undefined))
		}

		const transformation = resultImage.toURL().split('/')[6]
		setTransformation(effect, transformation)
	}
	const handlerChangeEffect = (selected: CustomEvent<{ value: string }>) => {
		optionEffetSelected = selected.detail.value as Effect
	}
	let selectedObjectToConserv = '' as ForegroundObjectValue
	const onSelectObjectToRemove = (
		event: CustomEvent<{ value: ForegroundObjectValue }>
	) => {
		selectedObjectToConserv = event.detail.value
	}
	const handlerAddObject = () => {
		if (!selectedObjectToConserv) {
			return
		}
		ForegroundObject = ForegroundObject.filter(object => object !== selectedObjectToConserv)
		objectsToConserv = [...objectsToConserv, selectedObjectToConserv]
	}
	const handlerRemoveObject = (objectToConserv: ForegroundObjectValue) => {
		objectsToConserv = objectsToConserv.filter(object => object !== objectToConserv)
		ForegroundObject = [...ForegroundObject, objectToConserv]
	}
</script>

<form on:submit={handlerEffect} class="w-full">
	<Fieldset legend="Effect">
		<Select Props={{ name: 'effect' }} on:change={handlerChangeEffect}>
			{#each Object.keys(EffectCloudinary) as optionEffect}
				<option value={optionEffect}>{FormatString(optionEffect)}</option>
			{/each}
		</Select>
		{#if checkboxKeys.includes(optionEffetSelected)}
			<Input Props={{ type: 'checkbox', name: 'apply' }} />
		{:else if optionEffetSelected === 'simulateColorBlind'}
			<Select Props={{ name: 'condition' }}>
				{#each SimulateColorblindConditions as effectCondition}
					<option value={effectCondition}>{TextFormating({ text: effectCondition })}</option>
				{/each}
			</Select>
		{:else if optionEffetSelected === 'backgroundRemoval'}
			<Select
				defaultOptioProps={{ disabled: false }}
				defaultLabelOption="Objets to conserv(auto)"
				on:change={(e) => onSelectObjectToRemove(e)}
			>
				{#each ForegroundObject as object}
					<option value={object}>{TextFormating({ text: object })}</option>
				{/each}
			</Select>
			{#each objectsToConserv as objectToConserv}
				<Card tag='span' on:click={() => handlerRemoveObject(objectToConserv)}>{TextFormating({ text: objectToConserv })}</Card>
			{/each}
			<Button props={{ type: 'button' }} on:click={handlerAddObject}>Add</Button>
		{:else}
			<Input Props={{ type: 'number', name: 'value', placeholder: '0' }} />
			{#if optionEffetSelected === 'colorize'}
				<Input Props={{ type: 'color', name: 'color' }} labeltext="Select Color" />
			{/if}
		{/if}

		<Button props={{ type: 'submit' }}>Apply</Button>
	</Fieldset>
</form>
