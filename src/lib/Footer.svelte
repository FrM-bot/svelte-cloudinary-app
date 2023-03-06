<script>
	import Cloudinary from './icons/Cloudinary.svelte'
	import Cross from './icons/Cross.svelte'
	import Svelte from './icons/Svelte.svelte'
	import Link from './Link.svelte'
</script>

<footer class="dark:bg-custom-dark shadow-lg py-4 px-6 border-t dark:border-t-custom-dark-2 mx-2">
	<div class="flex">
		<p class="flex items-center">Built and Design by</p>
		<Link href="https://frm-bot.xyz" Props={{ target: '_blank', title: 'Maciel Franco' }}>Maciel Franco</Link>
	</div>
	<div class="w-full grid place-content-center my-2">
		<div class="flex items-center flex-col gap-2 border-t dark:border-t-custom-dark-2">
			<p>Made with</p>
			<div class="flex items-center gap-2">
				<Svelte />
				<Cross />
				<Cloudinary />
			</div>
		</div>
	</div>
</footer>
