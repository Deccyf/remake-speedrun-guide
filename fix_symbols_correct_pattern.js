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

console.log('Fixing symbols in pages 7-16 to match pages 1-6 pattern...\\n');

pages.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix CSS content symbols to match pages 1-6
    content = content.replace(
      /content: '▶';/g,
      "content: '▸';"
    );
    
    // Fix navigation arrows to match pages 1-6  
    content = content.replace(
      /<span>◀<\/span>/g,
      '<span>←</span>'
    );
    
    content = content.replace(
      /<span>▶<\/span>/g,
      '<span>→</span>'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed symbols in ${fileName}`);
  } else {
    console.log(`⚠ File not found: ${fileName}`);
  }
});

console.log('\\n🎉 Fixed symbols to match pages 1-6 pattern!');
console.log('📝 Changes made:');
console.log('   • CSS content: "▶" → "▸" (table of contents bullets)');
console.log('   • HTML spans: "◀" → "←" (back navigation)');
console.log('   • HTML spans: "▶" → "→" (forward navigation)');
console.log('   • List check marks: "✓" (already correct)');
