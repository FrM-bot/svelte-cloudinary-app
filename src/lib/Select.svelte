<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements'
	import { FormatString } from '../utils/FromatingString'

	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let Props: HTMLSelectAttributes
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
</script>

<select
	class="dark:bg-custom-dark px-3 py-2 border dark:border-custom-dark-2 rounded-sm w-full"
	{...Props}
	on:change={handlerChange}
	value=''
>
<option selected disabled value="">Select option</option>

	<slot />
</select>
