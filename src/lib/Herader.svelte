<script>
	import Darkmode from './Darkmode.svelte'
	import Cloudinary from './icons/Cloudinary.svelte'
</script>

<header class="dark:bg-custom-dark/70 py-4 px-6 border-b-[2px] sticky top-0 bg-white/50 backdrop-blur-sm dark:border-primary z-10">
	<div class="flex justify-between items-center">
		<a href="/">
			<Cloudinary />
		</a>

		<Darkmode />
	</div>
</header>
