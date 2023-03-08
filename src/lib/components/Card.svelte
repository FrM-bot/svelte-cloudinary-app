<script lang="ts">
	import { classNameJoin } from '$lib/utils/ClassNames'

	export let variant = 'default' as 'gradient'
	export let tag = 'div'
	const VARIANTS = {
		default:
			'rounded-md border px-4 py-2 shadow-lg shadow-black/10 truncate dark:border-custom-dark-2 dark:bg-custom-dark',
		gradient:
			'border-[3px] py-2 px-3 rounded-md shadow-xl shadow-black/40 border-transparent dark:[background:linear-gradient(to_right,rgb(var(--custom-dark)),rgb(var(--custom-dark)))_padding-box,linear-gradient(to_right,rgb(var(--secondary)),rgb(var(--primary)))_border-box] [background:linear-gradient(to_right,#fff,#fff)_padding-box,linear-gradient(to_right,rgb(var(--secondary)),rgb(var(--primary)))_border-box] shadow-primary/20'
	}
	export let addClass = ''
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element this={tag} class={classNameJoin(addClass ?? '', VARIANTS[variant])} on:click>
	<slot />
</svelte:element>
