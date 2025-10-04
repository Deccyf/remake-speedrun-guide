const fs = require('fs');
const path = require('path');

// List of pages 7-16
const pages = [
  'remake_guide_page_7.html',
  'remake_guide_page_8.html',
  'remake_guide_page_9.html',
  'remake_guide_page_10.html',
  'remake_guide_page_11.html',
  'remake_guide_page_12.html',
  'remake_guide_page_13.html',
  'remake_guide_page_14.html',
  'remake_guide_page_15.html',
  'remake_guide_page_16.html'
];

console.log('Fixing symbols in pages 7-16...\\n');

pages.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix CSS content symbols
    content = content.replace(
      /content: '\?';/g,
      "content: '▶';"
    );
    
    // Fix tick mark symbols in CSS
    content = content.replace(
      /content: '\?'; position: absolute; left: 0; color: var\(--re-gold\);/g,
      "content: '✓'; position: absolute; left: 0; color: var(--re-gold);"
    );
    
    // Fix arrow navigation symbols
    content = content.replace(
      /<span>\?<\/span>/g,
      '<span>◀</span>'
    );
    
    // Apply specific patterns:
    // First arrow span in nav (backward)
    content = content.replace(
      /(<a href="[^"]*" class="page-nav-btn">\s*<span>)\?<\/span>/,
      '$1◀</span>'
    );
    
    // Second arrow span in nav (forward)
    content = content.replace(
      /(<span>◀<\/span>\s*<span>[^<]*<\/span>\s*<span>)\?<\/span>/,
      '$1▶</span>'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed symbols in ${fileName}`);
  } else {
    console.log(`⚠ File not found: ${fileName}`);
  }
});

console.log('\\n🎉 Fixed symbols across all pages 7-16!');
console.log('📝 Changes made:');
console.log('   • CSS content: "?" → "▶" (navigation arrows)');
console.log('   • CSS content: "?" → "✓" (check marks in lists)');
console.log('   • HTML spans: "?" → "◀" and "▶" (navigation arrows)');
