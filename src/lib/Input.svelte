<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	export let labeltext: string = ''
	export let Props: HTMLInputAttributes
</script>

{#if Props.type === 'checkbox'}
	<div class="flex items-center justify-center py-[0.3em] px-[0.6em]">
		<label
			for={Props?.name}
			class="flex items-center rounded cursor-pointer p-1 bg-primary to-custom-pink shadow-lg"
		>
			<input
				type="checkbox"
				class="w-28 h-7 relative after:absolute after:rounded rounded bg-white dark:bg-custom-dark-2 checked:after:right-full after:top-0 after:w-14 after:h-7 checked:after:bg-green-400 checked:after:shadow-[-1px_0px_20px_-4px_rgb(74_222_128)] active:after:w-16 after:duration-300 after:right-0 after:shadow-[-1px_0px_20px_-4px_rgb(248_113_113)]  after:bg-red-400 shadow-lg shadow-secondary checked:after:translate-x-full"
				{...Props}
			/>
		</label>
	</div>
{:else}
	<div class={'flex flex-col gap-1'}>
		{#if labeltext}
			<label for={Props?.name} class="dark:bg-primary w-fit px-2 py-1 mb-[1px] shadow-lg"
				>{labeltext}</label
			>
		{/if}
		<div
			class={`after:absolute after:bg-gradient-to-l after:from-primary after:to-secondary after:w-full after:rounded-sm after:h-[2px] after:bottom-0 after:left-0 after:scale-x-100 after:duration-300 after:z-[5] relative duration-300`}
		>
			<input
				class={`dark:bg-custom-dark bg-white outline-none border-[2px] border-transparent p-2 focus:border-primary text-primary font-medium duration-300 shadow-lg focus:shadow-black/20 focus:-translate-y-1 w-full`}
				{...Props}
			/>
		</div>
	</div>
{/if}
