<script lang="ts">
	import { onMount } from 'svelte'
	import { darkmode, initialDarkmodeState } from '../store/darkmode'
	import Moon from './icons/Moon.svelte'
	import Sun from './icons/Sun.svelte'
	let isDarkmode = initialDarkmodeState

	const handlerDarkmode = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement
		}
	) => {
		isDarkmode = event.currentTarget.checked
		darkmode.set(isDarkmode)
		window.localStorage.setItem('darkmode', JSON.stringify(isDarkmode))
		isDarkmode
			? document.documentElement.setAttribute('data-theme', 'dark')
			: document.documentElement.removeAttribute('data-theme')
	}
	onMount(() => {
		isDarkmode
			? document.documentElement.setAttribute('data-theme', 'dark')
			: document.documentElement.removeAttribute('data-theme')
	})
</script>

<label>
	{#if isDarkmode}
		<span class="text-primary border-[2px] border-primary inline-block py-2 px-3 rounded-md hover:bg-primary hover:text-white shadow-lg hover:shadow-primary/20 cursor-pointer duration-300 shadow-black/20">
			<Moon />
		</span>
	{:else}
		<span class="text-primary border-[2px] border-primary inline-block py-2 px-3 rounded-md hover:bg-primary hover:text-white shadow-lg hover:shadow-primary/20 cursor-pointer duration-300 shadow-black/20">
			<Sun />
		</span>
	{/if}
	<input
		on:change={(e) => handlerDarkmode(e)}
		bind:checked={isDarkmode}
		class="hidden"
		type="checkbox"
	/>
</label>
