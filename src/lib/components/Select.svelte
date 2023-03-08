<script lang="ts">
	import type { HTMLSelectAttributes, HTMLOptionAttributes } from 'svelte/elements'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let Props = { } as HTMLSelectAttributes
	const handlerChange = (
		event: Event & {
			currentTarget: EventTarget & HTMLSelectElement
		}
	) => {
		const value = event.currentTarget.value
		dispatch('change', {
			value
		})
	}
	export let defaultLabelOption = 'Select option'
	export let defaultOptioProps = {
		disabled: true,
		selected: true
	} as HTMLOptionAttributes
</script>

<select
	class="dark:bg-custom-dark px-3 py-2 border dark:border-custom-dark-2 rounded-sm w-full"
	on:change={handlerChange}
	{...Props}
	value=''
>
<option {...defaultOptioProps} value=''>{defaultLabelOption}</option>

	<slot />
</select>
