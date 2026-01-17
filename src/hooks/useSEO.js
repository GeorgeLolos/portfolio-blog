import { useEffect } from 'react';

/**
 * SEO Helper Hook - Updates document title and meta description dynamically
 * Compatible with React 19 (no external dependencies)
 */
export const useSEO = ({ title, description, type = 'website', url, structuredData }) => {
    useEffect(() => {
        // Update document title
        if (title) {
            document.title = title;
        }

        // Update meta description
        if (description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            }
        }

        // Update OG tags
        if (title) {
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', title);

            const twitterTitle = document.querySelector('meta[name="twitter:title"]');
            if (twitterTitle) twitterTitle.setAttribute('content', title);
        }

        if (description) {
            const ogDescription = document.querySelector('meta[property="og:description"]');
            if (ogDescription) ogDescription.setAttribute('content', description);

            const twitterDescription = document.querySelector('meta[name="twitter:description"]');
            if (twitterDescription) twitterDescription.setAttribute('content', description);
        }

        if (type) {
            const ogType = document.querySelector('meta[property="og:type"]');
            if (ogType) ogType.setAttribute('content', type);
        }

        // Inject dynamic structured data
        if (structuredData) {
            // Remove existing dynamic structured data
            const existingScript = document.getElementById('dynamic-structured-data');
            if (existingScript) {
                existingScript.remove();
            }

            // Add new structured data
            const script = document.createElement('script');
            script.id = 'dynamic-structured-data';
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }

        // Cleanup function
        return () => {
            const dynamicScript = document.getElementById('dynamic-structured-data');
            if (dynamicScript) {
                dynamicScript.remove();
            }
        };
    }, [title, description, type, url, structuredData]);
};

/**
 * Generate BlogPosting structured data for case studies
 */
export const generateBlogPostingSchema = (post) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "author": {
        "@type": "Person",
        "name": "George Lolos",
        "url": "https://georgellolos.github.io/portfolio-blog/"
    },
    "publisher": {
        "@type": "Person",
        "name": "George Lolos"
    },
    "articleSection": post.category,
    "keywords": [post.category, post.role, "Case Study", "Engineering Leadership"].join(", "),
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://georgellolos.github.io/portfolio-blog/blog/${post.id}`
    }
});

/**
 * Generate ItemList structured data for blog listing
 */
export const generateBlogListSchema = (posts) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Case Studies & Insights",
    "description": "Technology leadership insights, due diligence findings, and lessons from building ventures",
    "numberOfItems": posts.length,
    "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "url": `https://georgellolos.github.io/portfolio-blog/blog/${post.id}`
        }
    }))
});

export default useSEO;
