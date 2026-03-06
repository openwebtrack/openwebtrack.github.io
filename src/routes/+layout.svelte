<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#121212" />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>

{@render children()}
