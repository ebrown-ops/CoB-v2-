import { SitemapStream, streamToPromise } from 'sitemap';

export default async function handler(req, res) {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    // List of static pages
    const staticPages = [
      { url: '/', changefreq: 'daily', priority: 1 },
      { url: '/software', changefreq: 'weekly', priority: 0.8 },
      { url: '/loans', changefreq: 'weekly', priority: 0.8 },
      { url: '/credit-cards', changefreq: 'weekly', priority: 0.8 },
      { url: '/hr-solutions', changefreq: 'weekly', priority: 0.8 },
      { url: '/faq', changefreq: 'monthly', priority: 0.5 },
      { url: '/search', changefreq: 'weekly', priority: 0.7 },
    ];

    // Add static pages to sitemap
    staticPages.forEach((page) => {
      smStream.write(page);
    });

    // Here you would typically fetch your dynamic product pages from a database
    // For this example, we'll use mock data
    const products = [
      { id: 1, category: 'software' },
      { id: 2, category: 'loans' },
      { id: 3, category: 'credit-cards' },
      { id: 4, category: 'hr-solutions' },
    ];

    // Add dynamic product pages to sitemap
    products.forEach((product) => {
      smStream.write({
        url: `/${product.category}/${product.id}`,
        changefreq: 'weekly',
        priority: 0.7,
      });
    });

    smStream.end();

    const sitemapOutput = await streamToPromise(smStream);

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });

    res.end(sitemapOutput);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}