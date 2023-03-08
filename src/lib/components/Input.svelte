<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	export let labeltext: string = ''
	export let Props: HTMLInputAttributes
</script>

{#if Props.type === 'checkbox'}
	<div class="flex items-center justify-center py-[0.3em] px-[0.6em]">
		<label
			for={Props?.name}
			class="flex items-center cursor-pointer p-1 bg-zinc-200 dark:bg-custom-dark-2 to-custom-pink shadow-lg rounded"
		>
			<input
				type="checkbox"
				class="w-28 h-7 relative after:absolute after:rounded rounded bg-white dark:bg-custom-dark checked:after:right-full after:top-0 after:w-14 after:h-7 checked:after:bg-green-400 checked:after:shadow-[-1px_0px_20px_-4px_rgb(74_222_128)] active:after:w-16 after:duration-300 after:right-0 after:shadow-[-1px_0px_20px_-4px_rgb(248_113_113)]  after:bg-red-400 shadow-lg checked:after:translate-x-full"
				{...Props}
			/>
		</label>
	</div>
{:else if Props.type === 'color'}
	<div class={'flex items-center gap-2'}>
		{#if labeltext}
			<label
				for={Props?.name}
				class="dark:bg-custom-dark border dark:border-custom-dark-2 p-2 mb-[1px] shadow-lg w-full rounded-sm"
				>{labeltext}</label
			>
		{/if}
		<div
			class=' w-full'
		>
			<input
				class='w-full h-11 bg-transparent rounded'
				{...Props}
			/>
		</div>
	</div>
{:else}
	<div class={'flex flex-col gap-1'}>
		{#if labeltext}
			<label
				for={Props?.name}
				class="dark:bg-custom-dark border dark:border-custom-dark-2 p-2 mb-[2px] shadow-lg w-fit rounded-sm"
				>{labeltext}</label
			>
		{/if}
		<div
			class={`after:absolute after:bg-gradient-to-l after:from-primary after:to-custom-pink after:w-full after:rounded after:h-px after:bottom-0 after:left-0 after:scale-x-100 after:duration-300 after:z-[5] relative duration-300`}
		>
			<input
				class={`dark:bg-custom-dark bg-white font-normal rounded-sm outline-none border border-transparent p-2 focus:border-secondary duration-300 shadow-lg focus:shadow-black/20 focus:-translate-y-1 w-full`}
				{...Props}
			/>
		</div>
	</div>
{/if}
