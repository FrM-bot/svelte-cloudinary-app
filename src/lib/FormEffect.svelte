<script lang="ts">
	import { imageToEdit } from '../store/image'
	import { setTransformation } from '../store/transformations'
	import type { ConditionTypes, EffectTypes } from '../types/Effect'
	import { cloudinary } from '../utils/cloudinary'
	import { EffectCloudinary, SimulateColorblindConditions } from '../utils/Effect'
	import { FormatString } from '../utils/FromatingString'
	import { getDataToFrom } from '../utils/GetFormData'
	import Button from './Button.svelte'
	import Fieldset from './Fieldset.svelte'
	import Input from './Input.svelte'
	import Select from './Select.svelte'

	let optionEffetSelected: string

	const checkboxKeys = ['backgroundRemoval', 'redEye', 'negate', 'grayscale']

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
			effect: EffectTypes
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
		} else {
			resultImage.effect(EffectCloudinary[effect](value ?? undefined))
		}

		const transformation = resultImage.toURL().split('/')[6]
		setTransformation(effect, transformation)
	}
	const handlerChangeEffect = (selected: CustomEvent<{ value: string }>) => {
		optionEffetSelected = selected.detail.value
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
					<option value={effectCondition}>{effectCondition.replaceAll('_', ' ')}</option>
				{/each}
			</Select>
		{:else}
			<Input Props={{ type: 'number', name: 'value' }} />
			{#if optionEffetSelected === 'colorize'}
				<Input Props={{ type: 'color', name: 'color' }} />
			{/if}
		{/if}

		<Button>Apply</Button>
	</Fieldset>
</form>
