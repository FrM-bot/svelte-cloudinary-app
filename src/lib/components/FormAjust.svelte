<script lang="ts">
	import Button from './Button.svelte'
	import Input from '$lib/components/Input.svelte'
	import { getDataToFrom } from '../utils/GetFormData'
	import { cloudinary } from '../utils/cloudinary'
	import { imageToEdit } from '../store/image'
	import { FormatString } from '../utils/FromatingString'
	import type { Ajust } from '../types/Ajust'
	import { AjustCloudinary } from '../utils/Ajust'
	import Fieldset from './Fieldset.svelte'
	import Select from './Select.svelte'
	import { setTransformation } from '../store/transformations'
	let optionSelected: Ajust

	const checkboxKeys = ['improve']


	const handlerAjust = (
		event: Event & {
			readonly submitter: HTMLElement | null
		} & {
			currentTarget: EventTarget & HTMLFormElement
		}
	) => {
		event.preventDefault()
		const data = getDataToFrom(event.currentTarget)
		const { value, ajust, apply } = data as unknown as {
			value: number
			ajust: Ajust
			apply: 'on' | undefined
		}
		if (!ajust) {
			return
		}
		if (checkboxKeys.includes(ajust) && !apply) {
			return
		}
		const resultImage = cloudinary
			.image($imageToEdit.publicId)
			.adjust(AjustCloudinary[ajust](value ?? undefined))

		const transformation = resultImage.toURL().split('/')[6]
		setTransformation(ajust, transformation)
	}
	const handlerChangeEffect = (selected: CustomEvent<{ value: string }>) => {
		optionSelected = selected.detail.value as Ajust
	}
</script>

<form on:submit={handlerAjust} class="w-full">
	<Fieldset legend="Ajust">
		<Select Props={{ name: 'ajust' }} on:change={handlerChangeEffect}>
			{#each Object.keys(AjustCloudinary) as option}
				<option value={option}>{FormatString(option)}</option>
			{/each}
		</Select>
		{#if optionSelected === 'improve'}
			<Input Props={{ name: 'apply', type: 'checkbox' }} />
		{:else}
			<Input Props={{ name: 'value', type: 'number', placeholder: '0' }} />
		{/if}
		<Button>Apply</Button>
	</Fieldset>
</form>
