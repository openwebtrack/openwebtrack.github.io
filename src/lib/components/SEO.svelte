<script lang="ts">
	interface Props {
		title: string;
		description: string;
		image?: string;
		url?: string;
		type?: 'website' | 'article';
		publishedAt?: string;
		modifiedAt?: string;
		author?: string;
		tags?: string[];
	}

	let { title, description, url = 'https://openwebtrack.github.io', type = 'website', publishedAt, modifiedAt, author = 'OpenWebTrack', tags = [] }: Props = $props();

	const fullTitle = $derived(title.includes('OpenWebTrack') ? title : `${title} | OpenWebTrack`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="author" content={author} />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="canonical" href={url} />

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="OpenWebTrack" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:creator" content="@openwebtrack" />

	{#if type === 'article'}
		<meta property="article:author" content={author} />
		<meta property="article:publisher" content="https://openwebtrack.github.io" />
		{#if publishedAt}
			<meta property="article:published_time" content={publishedAt} />
		{/if}
		{#if modifiedAt}
			<meta property="article:modified_time" content={modifiedAt} />
		{/if}
		{#each tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>
