<script lang="ts">
	import { onMount } from 'svelte'
	import { darkmode, initialDarkmodeState } from '../store/darkmode'
	let isDarkmode = initialDarkmodeState

	const handlerDarkmode = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement
		}
	) => {
		isDarkmode = event.currentTarget.checked
		darkmode.set(isDarkmode)
        window.localStorage.setItem('darkmode', JSON.stringify(isDarkmode))
        isDarkmode ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.removeAttribute('data-theme')		
	}
	onMount(() => {
        isDarkmode ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.removeAttribute('data-theme')		
	})
</script>

<label>
	{#if isDarkmode}
		<span>Darkmode</span>
	{:else}
		<span>Ligth</span>
	{/if}
	<input
		on:change={(e) => handlerDarkmode(e)}
		bind:checked={isDarkmode}
		class="hidden"
		type="checkbox"
	/>
</label>
