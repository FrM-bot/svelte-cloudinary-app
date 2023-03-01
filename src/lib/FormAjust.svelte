<script lang="ts">
	import Button from './Button.svelte'
	import Input from '$lib/Input.svelte'
	import { getDataToFrom } from '../utils/GetFormData'
	import { cloudinary } from '../utils/cloudinary'
	import { imageToEdit } from '../store/image'
	import { FormatString } from '../utils/FromatingString'
	import type { AjustTypes } from '../types/Ajust'
	import { AjustCloudinary } from '../utils/Ajust'
	import Fieldset from './Fieldset.svelte'
	import Select from './Select.svelte'
	import { setTransformation } from '../store/transformations'

	const handlerAjust = (
		event: Event & {
			readonly submitter: HTMLElement | null
		} & {
			currentTarget: EventTarget & HTMLFormElement
		}
	) => {
		event.preventDefault()
		const data = getDataToFrom(event.currentTarget)
		const { value, ajust } = data as unknown as {
			value: number
			ajust: AjustTypes
		}
		if (!ajust) {
			return
		}
		const resultImage = cloudinary.image($imageToEdit.publicId).adjust(AjustCloudinary[ajust](value))

		const transformation = resultImage.toURL().split('/')[6]
		setTransformation(ajust, transformation)
	}
</script>

<form on:submit={handlerAjust} class="w-full">
	<Fieldset legend="Ajust">
		<Select Props={{ name: 'ajust' }}>
			{#each Object.keys(AjustCloudinary) as option}
				<option value={option}>{FormatString(option)}</option>
			{/each}
		</Select>
		<Input Props={{ name: 'value', type: 'number', placeholder: '40' }} />
		<Button>Apply</Button>
	</Fieldset>
</form>
