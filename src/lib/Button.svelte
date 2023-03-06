<script lang="ts">
	export let isLoading = false as boolean
	export let varint = 'default' as 'error' | 'default' | 'success'
	const VARIANTS = {
		success: 'text-green-500/80 hover:text-green-500 hover:border-green-500  border-green-500/80 hover:shadow-green-500/20',
		error:
			'text-secondary/80 hover:text-secondary hover:border-secondary border-secondary/80 hover:shadow-red-500/20',
		default:
			'text-custom-dark/80 dark:text-white/80 hover:text-custom-dark dark:hover:text-white hover:border-gray-300 dark:border-custom-dark-2/50 dark:hover:border-custom-dark-2 hover:shadow-xl'
	}
	const VARIANTS_LOADER = {
		success: 'border-x-green-500',
		error: 'border-x-secondary',
		default: 'border-x-white/30'
	}
</script>

<button
	on:click
	class={`${VARIANTS[varint]} grid place-content-center truncate bg-white dark:bg-custom-dark [letter-spacing:1px] border px-[.8em] py-[.4em] rounded-md shadow-lg active:translate-y-[2px] active:[letter-spacing:2px] duration-300`}
>
	{#if isLoading}
		<span class={`${VARIANTS_LOADER[varint]} loader w-6 h-6 rounded-full border-y-transparent border-[2px] bg-transparent`} />
	{:else}
		<slot />
	{/if}
</button>

<style>
	.loader {
		animation: rot1 1.2s linear infinite;
	}

	@keyframes rot1 {
		to {
			transform: rotate(360deg);
		}
	}
</style>
