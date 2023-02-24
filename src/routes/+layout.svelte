<script>
	import Footer from '$lib/Footer.svelte'
	import Herader from '$lib/Herader.svelte'
	import '../styles/app.css'
</script>

<Herader />

<main class="my-6 max-w-7xl mx-auto min-h-[83vh] px-3">
	<slot />
</main>

<Footer />
