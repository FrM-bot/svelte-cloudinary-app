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
					dispatch('drop', {
						file
					})
				}
			})
		}
		event.currentTarget.classList.add('hidden')

	}

	const onDragOver = (event: DragEvent & { currentTarget: EventTarget & HTMLDivElement }) => event.preventDefault()
	const onDragLeave = (event: DragEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
		if (event?.currentTarget) {
			event?.currentTarget.classList.add('hidden')
		}
	}
	onMount(() => {
		const appRoot = document.querySelector('#app')
		let targetDrag: Element | null = null

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
	class="hidden fixed inset-0 w-full h-screen bg-black/30 backdrop-blur-sm z-10"
	id="dropzone"
	on:drop={onDrop}
	on:dragover|once={onDragOver}
	on:dragleave={onDragLeave}
>
	<p>Drag one or more files to this <i>drop zone</i>.</p>
</div>
