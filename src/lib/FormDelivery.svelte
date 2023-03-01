<script lang="ts">
	import { imageToEdit } from '../store/image'
	import { cloudinary } from '../utils/cloudinary'
	import { getDataToFrom } from '../utils/GetFormData'
	import Button from './Button.svelte'
	import { format, quality } from '@cloudinary/url-gen/actions/delivery'
	import { FormatString } from '../utils/FromatingString'
	import { OptionsDeliveryFromat, OptionsDeliveryQuality } from '../utils/Delivery'
	import type { DeliveryTypes } from '../types/Delivery'
	import Fieldset from './Fieldset.svelte'
	import { setTransformation } from '../store/transformations'
	import Select from './Select.svelte'

	const DeliveryCloudinary = {
		format,
		quality
	}

	let optionDeliverySelected: string

	const handlerDelivery = (
		event: Event & {
			readonly submitter: HTMLElement | null
		} & {
			currentTarget: EventTarget & HTMLFormElement
		}
	) => {
		event.preventDefault()
		const data = getDataToFrom(event.currentTarget)
		const { optionDelivery, delivery } = data as unknown as {
			optionDelivery: string
			delivery: DeliveryTypes
		}
		if (!delivery || !optionDelivery) {
			return
		}
		const resultImage = cloudinary
			.image($imageToEdit.publicId)
			.delivery(DeliveryCloudinary[delivery](optionDelivery))
		let transformation = resultImage.toURL().split('/')[6]
		setTransformation(delivery, transformation)
	}

	const handlerChangeSelect = (selected: CustomEvent<{ value: string }>) => {
		optionDeliverySelected = selected.detail.value
	}
</script>

<form on:submit={handlerDelivery} class="w-full">
	<Fieldset legend="Delivery">
		<Select Props={{ name: 'delivery' }} on:change={handlerChangeSelect}>
			{#each Object.keys(DeliveryCloudinary) as optionDelivery}
				<option value={optionDelivery}>{FormatString(optionDelivery)}</option>
			{/each}
		</Select>

		<Select Props={{ name: 'optionDelivery' }}>
			{#if optionDeliverySelected === 'format'}
				{#each OptionsDeliveryFromat as { name, value }}
					<option {value}>{name}</option>
				{/each}
			{:else if optionDeliverySelected === 'quality'}
				{#each OptionsDeliveryQuality as { name, value }}
					<option {value}>{name}</option>
				{/each}
			{/if}
		</Select>
		<Button>Apply</Button>
	</Fieldset>
</form>
