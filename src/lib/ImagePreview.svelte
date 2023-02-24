<script lang="ts">
	export let alt: string
	export let src: string
</script>

<div class="rounded-md border-[2px] border-primary px-4 py-2 shadow-lg shadow-black/20">
	<h2>
		{alt}
	</h2>
</div>
<picture
	class="overflow-hidden w-fit bg-gradient-to-r from-custom-cyan to-custom-pink border-[5px] rounded-md shadow-xl shadow-black/40 [letter-spacing:1px;] active:[letter-spacing:1px;] hover:[letter-spacing:2px;] border-transparent [background:linear-gradient(to_right,#fff,#fff)_padding-box,linear-gradient(to_right,rgb(var(--secondary)),rgb(var(--primary)))_border-box] duration-300"
>
	<img class="hover:scale-110 max-h-[60vh] duration-300" {src} {alt} />
</picture>
