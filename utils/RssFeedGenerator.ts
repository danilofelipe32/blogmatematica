import { Post } from '../types';
import { parsePortugueseDate } from './dateParser';

// Helper to escape XML characters
const escapeXml = (unsafe: string): string => {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};


export const generateRssFeedXml = (posts: Post[]): string => {
    const siteUrl = window.location.origin; // Use the current site's origin
    const sortedPosts = [...posts].sort((a, b) => parsePortugueseDate(b.date).getTime() - parsePortugueseDate(a.date).getTime());

    const feedItems = sortedPosts
        .slice(0, 20) // Limit to the 20 most recent posts
        .map(post => {
            const postUrl = `${siteUrl}/#post/${post.id}`;
            const pubDate = parsePortugueseDate(post.date).toUTCString();
            
            return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="false">${siteUrl}/${post.id}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${escapeXml(post.author)}</author>
      <category>${escapeXml(post.category)}</category>
    </item>`;
        })
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Math Insights - Blog de Matemática</title>
    <link>${siteUrl}</link>
    <description>Explorando a beleza e a lógica do universo matemático.</description>
    <language>pt-BR</language>
    <lastBuildDate>${sortedPosts.length > 0 ? parsePortugueseDate(sortedPosts[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${feedItems}
  </channel>
</rss>`;
};
