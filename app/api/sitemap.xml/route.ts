export async function GET() {
    const baseUrl = 'https://ention.in';
    const currentDate = new Date().toISOString();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${baseUrl}/assets/ention-logo.png</image:loc>
      <image:title>ENTION - Made in India Laptops</image:title>
      <image:caption>Premium Made in India Laptops with latest technology</image:caption>
    </image:image>
  </url>
  
  <!-- Products Page -->
  <url>
    <loc>${baseUrl}/ecommerce/product</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- About Us Page -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Collaborate Page -->
  <url>
    <loc>${baseUrl}/collaborate</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, must-revalidate',
        },
    });
}
