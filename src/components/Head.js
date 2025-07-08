"use client";

import { useEffect } from "react";

/**
 * Custom Head component for Next.js App Router
 * Note: In Next.js 13+ App Router, it's recommended to use the metadata API
 * This component is useful for dynamic head changes that can't be handled by static metadata
 */
export default function Head({
  title,
  description,
  keywords,
  ogImage,
  canonical,
}) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = description;
        document.head.appendChild(newMetaDescription);
      }
    }

    // Update meta keywords
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", keywords);
      } else {
        const newMetaKeywords = document.createElement("meta");
        newMetaKeywords.name = "keywords";
        newMetaKeywords.content = keywords;
        document.head.appendChild(newMetaKeywords);
      }
    }

    // Update Open Graph image
    if (ogImage) {
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute("content", ogImage);
      } else {
        const newOgImage = document.createElement("meta");
        newOgImage.setAttribute("property", "og:image");
        newOgImage.content = ogImage;
        document.head.appendChild(newOgImage);
      }
    }

    // Update canonical URL
    if (canonical) {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonical);
      } else {
        const newCanonical = document.createElement("link");
        newCanonical.rel = "canonical";
        newCanonical.href = canonical;
        document.head.appendChild(newCanonical);
      }
    }
  }, [title, description, keywords, ogImage, canonical]);

  return null; // This component doesn't render anything
}
