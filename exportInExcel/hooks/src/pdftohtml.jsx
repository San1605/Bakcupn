import React from 'react';
import DOMPurify from 'dompurify';

function HTMLSanitizer({ htmlString }) {
  // Use DOMPurify to sanitize the HTML and remove inline styles
  const sanitizedHTML = DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: [], // Allow no tags, only text content
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
  );
}

export default HTMLSanitizer;
