<script lang="ts">
	import { get } from 'svelte/store'
	import { transformationsStore } from '../store/transformations'
	import { FormatString } from '../utils/FromatingString'
	import Card from './Card.svelte'
	import Cross from './icons/Cross.svelte'
	import TextGradient from './TextGradient.svelte'
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

                <TextGradient>{FormatString(key)}</TextGradient>
                <button on:click={() => handlerRemove({ key })} class=" grid place-content-center border rounded-full hover:scale-110 text-custom-pink/70 border-custom-pink/70 hover:border-custom-pink hover:text-custom-pink duration-300">
				<Cross />
                </button>
            </div>
		</Card>
	{/each}
</div>
