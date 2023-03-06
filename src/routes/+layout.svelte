<script>
	import { onMount, onDestroy } from 'svelte'
	import Footer from '$lib/Footer.svelte'
	import Herader from '$lib/Herader.svelte'
	import '../styles/app.css'
	import { imageToEdit } from '../store/image'
	onMount(() => {
		window.addEventListener('beforeunload', (event) => {
			event.preventDefault()
			return (event.returnValue = '')
		})
		window.onunload = () => {
			if (!window.navigator.sendBeacon) return

			if ($imageToEdit?.publicId.length > 0) {
				const url = `/api/${$imageToEdit.publicId}`
				navigator.sendBeacon(url, JSON.stringify({ publicId: $imageToEdit?.publicId }))
			}
		}
	})
</script>

<Herader />

<main class="my-6 max-w-7xl mx-auto min-h-[75vh] px-3">
	<slot />
</main>

<Footer />
