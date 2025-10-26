export const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';

  return markdown
    .split('\n\n')
    .map(paragraph => {
      // Headers
      paragraph = paragraph.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      paragraph = paragraph.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
      
      // Lists
      if (paragraph.match(/^\s*[-*] /)) {
        const listItems = paragraph.split('\n').map(item => 
          item.replace(/^\s*[-*] (.*$)/gim, '<li>$1</li>')
        ).join('');
        return `<ul>${listItems}</ul>`;
      }
      
      // Inline: Bold
      paragraph = paragraph.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

      // Prevent wrapping block elements in <p>
      if (paragraph.startsWith('<h') || paragraph.startsWith('<ul')) {
        return paragraph;
      }

      // Paragraphs
      // Only wrap in <p> if it's not already a block element
      if (paragraph.trim().length > 0 && !paragraph.startsWith('<')) {
        return `<p>${paragraph.replace(/\n/g, '<br/>')}</p>`;
      }
      return paragraph;
    })
    .join('');
};
