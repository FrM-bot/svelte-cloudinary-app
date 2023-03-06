<script lang="ts">
	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'
	import Card from './Card.svelte'
	const dispatch = createEventDispatcher()

	const onDrop = (event: DragEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
		event.preventDefault()
		if (event.dataTransfer?.items) {
			;[...event.dataTransfer.items].forEach((item) => {
				if (item.kind === 'file') {
					const file = item.getAsFile()
					if (file?.type.split('/').at(0) !== 'image') {
						return alert('Only images are allowed')
					}
					dispatch('drop', {
						file
					})
				}
			})
		}
		event.currentTarget.classList.add('hidden')
	}

	const onDragOver = (event: DragEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
		event.preventDefault()
	}
	const onDragLeave = (event: DragEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
		if (!event?.currentTarget?.classList?.contains('hidden')) {
			event?.currentTarget.classList.add('hidden')
		}
	}
	onMount(() => {
		let targetDrag: Element | null = null
		const appRoot = document.querySelector('#app')

		appRoot?.addEventListener('dragover', (event) => {
			event.preventDefault()
			if (!targetDrag) {
				targetDrag = document.querySelector('#dropzone')
			}
			if (targetDrag?.classList.contains('hidden')) {
				targetDrag?.classList.remove('hidden')
			}
		})
	})
</script>

<div
	class="hidden fixed inset-0 w-full h-screen bg-white/5 dark:bg-black/5 backdrop-blur-[2px] z-20 after:bg-transparent after:rounded after:inset-0 after:w-full after:h-screen after:absolute after:z-10 duration-300"
	id="dropzone"
	on:drop={onDrop}
	on:dragover={onDragOver}
	on:dragleave={onDragLeave}
>
	<div class="w-full h-full grid place-content-center z-0">
		<div class="flex items-center flex-col text-custom-dark bg-white/80 dark:bg-custom-dark/80 dark:text-white rounded-md shadow-lg p-4">
			<p>Drop image anywhere</p>
			<svg class="w-40 h-40" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"
				><g fill="none" fill-rule="evenodd" transform="translate(3 3)"
					><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
						><path
							d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z"
						/><path d="m14.5 10.5-3-3-3 2.985" /><path d="m12.5 14.5-9-9-3 3" /></g
					><circle cx="11" cy="4" fill="currentColor" r="1" /></g
				></svg
			>
		</div>
	</div>
	<!-- <slot /> -->
</div>
