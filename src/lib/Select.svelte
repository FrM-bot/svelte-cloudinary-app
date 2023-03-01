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
	class="dark:bg-custom-dark dark:text-white px-3 py-2 border-[2px] border-primary rounded w-full"
	{...Props}
	on:change={handlerChange}
>
	<option value="" selected>Select option</option>

	<slot />
</select>
