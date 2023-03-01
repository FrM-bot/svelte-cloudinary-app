<script lang="ts">
	import { get } from 'svelte/store'
	import { transformationsStore } from '../store/transformations'
	import { FormatString } from '../utils/FromatingString'
	import Card from './Card.svelte'
	export let transformations = get(transformationsStore)

	const handlerRemove = ({ key }: { key: string }) => {
		const { [key]: _propRemoved, ...resTransformations } = $transformationsStore

		transformationsStore.set({
			...resTransformations
		})
	}
</script>

<div class="w-full flex flex-wrap gap-2">
	{#each Object.entries(transformations) as [key]}
		<Card>
            <div class="flex gap-2 items-center">

                <span>{FormatString(key)}</span>
                <button on:click={() => handlerRemove({ key })} class=" grid place-content-center border rounded-full div-1 hover:scale-105 hover:border-primary duration-300">
                    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"
					><g
                    fill="none"
                    fill-rule="evenodd"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"><path d="m7.5 7.5 6 6" /><path d="m13.5 7.5-6 6" /></g
					></svg
                    >
                </button>
            </div>
		</Card>
	{/each}
</div>
