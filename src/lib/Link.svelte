<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements"
    export let href: string
    export let Props = {} as HTMLAnchorAttributes
</script>

<a href={href} class="hover:text-primary duration-300" {...Props}>
	<slot />
</a>