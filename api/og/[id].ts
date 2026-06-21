export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    try {
        const url = new URL(req.url);
        const segments = url.pathname.split('/');
        const id = segments[segments.length - 1];

        if (!id || id === 'og') {
            return new Response('Missing listing ID', { status: 400 });
        }

        // ✅ Fetch from your actual backend
        const API_URL = 'https://motomartgh-api.vercel.app/api';
        const res = await fetch(`${API_URL}/listings/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            return new Response('Listing not found', { status: 404 });
        }

        const json = await res.json();
        const listing = json.data || json;

        // Build OG title
        const bikeTitle = [listing.brand, listing.model].filter(Boolean).join(' ');
        const year = listing.year ? `(${listing.year})` : '';
        const price = listing.price ? `GHS ${listing.price.toLocaleString()}` : '';
        const title = `${bikeTitle} ${year} - ${price}`.trim();

        // Build OG description
        const parts = [
            listing.condition,
            listing.mileage ? `${listing.mileage.toLocaleString()}km` : null,
            listing.engineCapacity ? `${listing.engineCapacity}cc` : null,
            listing.location ? `${listing.location}, Ghana` : 'Ghana',
        ].filter(Boolean);
        const description = parts.join(' | ');

        // Build OG image
        const image = listing.images?.[0] || 'https://motomartgh.vercel.app/og-default.jpg';

        // Canonical URL
        const canonicalUrl = `https://motomartgh.vercel.app/listing/${id}`;

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title} | MotoMartGH</title>
  <meta name="description" content="${description}" />
  
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="MotoMartGH" />
  <meta property="product:price:amount" content="${listing.price || 0}" />
  <meta property="product:price:currency" content="GHS" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  
  <meta http-equiv="refresh" content="0; url=${canonicalUrl}" />
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <p><a href="${canonicalUrl}">View on MotoMartGH</a></p>
</body>
</html>`;

        return new Response(html, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('OG function error:', error);
        return new Response('Error generating preview', { status: 500 });
    }
}