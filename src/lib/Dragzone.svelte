<script lang="ts">
	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	const onDrop = (event: DragEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
		event.preventDefault()
		if (event.dataTransfer?.items) {
			[...event.dataTransfer.items].forEach((item) => {
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
		const appRoot = document.querySelector('body')

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
	class="hidden fixed inset-0 w-full h-screen bg-white/40 dark:bg-black/40 backdrop-blur-sm z-20"
	id="dropzone"
	on:drop={onDrop}
	on:dragover={onDragOver}
	on:dragleave={onDragLeave}
>
	<div class="w-full h-full grid place-content-center z-0">
		<p>Drop image anywhere</p>
	</div>
</div>
