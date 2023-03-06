<script lang="ts">
	import { classNameJoin } from "../utils/ClassNames"


	export let variant = 'default' as 'gradient'
	export let tag = 'div'
	// export let handler;
	const VARIANTS = {
		default: 'rounded-md border px-4 py-2 shadow-lg shadow-black/10 truncate dark:border-custom-dark-2 dark:bg-custom-dark',
		gradient: 'bg-gradient-to-r from-custom-cyan to-custom-pink border-[3px] py-2 px-3 rounded-md shadow-xl shadow-black/40 [letter-spacing:1px;] border-transparent dark:[background:linear-gradient(to_right,rgb(var(--custom-dark)),rgb(var(--custom-dark)))_padding-box,linear-gradient(to_right,rgb(var(--secondary)),rgb(var(--primary)))_border-box] [background:linear-gradient(to_right,#fff,#fff)_padding-box,linear-gradient(to_right,rgb(var(--secondary)),rgb(var(--primary)))_border-box] shadow-primary/20 duration-300'
	}
	export let addClass = ''
</script>

<svelte:element
	this={tag}
	class={classNameJoin(addClass ?? '', VARIANTS[variant])}
>
	<slot />
</svelte:element>

<!-- {#if variant === 'b-radient'}
	<div
		class="bg-gradient-to-r to-primary from-secondary p-[3px] w-fit h-fit rounded-lg grid place-content-center border-[2px] dark:border-custom-dark-2 shadow-lg shadow-primary/20 hover:shadow-primary/10 duration-300"
	>
		<div
			class="bg-white z-0 dark:border-t-slate-800 dark:bg-custom-dark cursor-pointer text-3xl font-semibold px-3 py-1 rounded-md border-t duration-300"
		>
			<slot />
		</div>
	</div>
{:else}
	<div class="">
		<slot />
	</div>
{/if} -->
