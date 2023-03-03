<script lang="ts">
	export let isLoading = false as boolean
	export let varint = 'default' as 'error' | 'default'
	const VARIANTS = {
		error:
			'text-secondary/80 hover:text-secondary hover:border-secondary border-secondary/80 shadow-lg hover:shadow-red-500/20',
		default:
			'dark:bg-custom-dark bg-white text-primary/80 dark:text-primary/80 hover:text-primary dark:hover:text-primary hover:border-primary border-primary/80 hover:shadow-primary/20'
	}
</script>

<button
	on:click
	class={`${VARIANTS[varint]} grid place-content-center truncate text-custom-dark [letter-spacing:1px] border px-[.8em] py-[.4em] rounded-md shadow-lg shadow-primary/10 active:translate-y-[2px] active:[letter-spacing:2px] duration-300`}
>
	{#if isLoading}
		<span class={`${VARIANTS[varint]} loader`} />
	{:else}
		<slot />
	{/if}
</button>

<style>
	.loader {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		border: 3px solid;
		border-top-color: transparent;
		animation: rot1 1.2s linear infinite;
        display: inline-block;
	}

	@keyframes rot1 {
		to {
			transform: rotate(360deg);
		}
	}
</style>
