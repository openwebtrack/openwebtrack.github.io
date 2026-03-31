export const prerender = true;

export async function GET() {
	const baseUrl = 'https://openwebtrack.github.io';

	const pages = [
		{ url: '/', priority: 1.0, changefreq: 'weekly' },
		{ url: '/docs', priority: 0.9, changefreq: 'weekly' },
		{ url: '/docs/installation', priority: 0.8, changefreq: 'monthly' },
		{ url: '/docs/tracking/events', priority: 0.7, changefreq: 'monthly' },
		{ url: '/docs/tracking/revenue', priority: 0.7, changefreq: 'monthly' }
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
