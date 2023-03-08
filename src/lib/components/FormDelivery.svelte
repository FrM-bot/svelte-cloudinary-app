<script lang="ts">
	import { imageToEdit } from '$lib/store/image'
	import { cloudinary } from '$lib/utils/cloudinary'
	import { getDataToFrom } from '$lib/utils/GetFormData'
	import Button from './Button.svelte'
	import { FormatString } from '../utils/FromatingString'
	import { DeliveryCloudinary, OptionsDeliveryFromat, OptionsDeliveryQuality } from '$lib/utils/Delivery'
	import type { Delivery } from '$lib/types/Delivery'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import { setTransformation } from '$lib/store/transformations'
	import Select from '$lib/components/Select.svelte'
	import Input from './Input.svelte'

	let optionDeliverySelected: Delivery

	const deliverySelections = ["format", "quality"]

	const handlerDelivery = (
		event: Event & {
			readonly submitter: HTMLElement | null
		} & {
			currentTarget: EventTarget & HTMLFormElement
		}
	) => {
		event.preventDefault()
		const data = getDataToFrom(event.currentTarget)
		const { optionDelivery, delivery, value } = data as unknown as {
			optionDelivery: string
			delivery: Delivery
			value: number
		}
		if (!delivery) {
			return
		}
		if (deliverySelections.includes(delivery) && !optionDelivery) {
			return
		}
		const resultImage = cloudinary
			.image($imageToEdit.publicId)
		if (delivery === 'density') {
			resultImage.delivery(DeliveryCloudinary[delivery](value ?? undefined))
			
		} else {
			resultImage.delivery(DeliveryCloudinary[delivery](optionDelivery))
		}
		let transformation = resultImage.toURL().split('/')[6]
		setTransformation(delivery, transformation)
	}

	const handlerChangeSelect = (selected: CustomEvent<{ value: Delivery }>) => {
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
		{#if optionDeliverySelected === 'density'}
			<Input Props={{ name: 'value', placeholder: '0' }} />
		{:else}
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
		{/if}

		<Button>Apply</Button>
	</Fieldset>
</form>
