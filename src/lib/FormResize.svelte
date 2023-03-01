<script lang="ts">
	import { imageToEdit } from '../store/image'
	import { cloudinary } from '../utils/cloudinary'
	import { FormatString } from '../utils/FromatingString'
	import { getDataToFrom } from '../utils/GetFormData'
	import Input from '$lib/Input.svelte'
	import Button from '$lib/Button.svelte'
	import { ResizeCloudinary } from '../utils/Resize'
	import type { ResizeTypes } from '../types/Resize'
	import Fieldset from './Fieldset.svelte'
	import Select from './Select.svelte'
	import { setTransformation } from '../store/transformations'

	const handlerResize = async (
		event: Event & {
			readonly submitter: HTMLElement | null
		} & {
			currentTarget: EventTarget & HTMLFormElement
		}
	) => {
		event.preventDefault()
		const data = getDataToFrom(event.currentTarget)
		const { width, height, resize } = data as unknown as {
			width: number
			height: number
			resize: ResizeTypes
		}
		if (resize) {
			const resultImage = cloudinary
				.image($imageToEdit.publicId)
				.resize(ResizeCloudinary[resize]().width(width).height(height))
			let transformation = resultImage.toURL().split('/')[6]
			setTransformation(resize, transformation)
		}
	}
</script>

<form on:submit={handlerResize} class="w-full">
	<Fieldset legend="Resize">
		<Select Props={{ name: 'resize' }}>
			{#each Object.keys(ResizeCloudinary) as option }
				<option value={option}>{FormatString(option)}</option>
			{/each}
		</Select>
		<Input Props={{ name: 'width', type: 'number' }} labeltext="Width" />
		<Input Props={{ name: 'height', type: 'number' }} labeltext="Height" />
		<Button>Apply</Button>
	</Fieldset>
</form>
