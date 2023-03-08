<script lang="ts">
	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'
	import TextGradient from './TextGradient.svelte'
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
		<div class="flex items-center border dark:border-custom-dark-2 flex-col text-custom-dark bg-white/80 dark:bg-custom-dark/80 dark:text-white rounded-md shadow-lg p-4">
			<TextGradient>Drop image anywhere</TextGradient>
		</div>
	</div>
</div>
