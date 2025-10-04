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

console.log('Fixing objectives box tick marks in pages 7-16...\\n');

pages.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix objectives box list symbols to use check marks like pages 1-6
    content = content.replace(
      /objectives-box li::before {[^}]+content: '[^']*';[^}]+}/g,
      `.objectives-box li::before {
    content: '✓'; position: absolute; left: 0; color: var(--re-gold);
    font-weight: 700; font-size: 1.2rem;
  }`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed objectives box symbols in ${fileName}`);
  } else {
    console.log(`⚠ File not found: ${fileName}`);
  }
});

console.log('\\n🎉 Fixed objectives box tick marks!');
console.log('📝 Changed symbols from "▸" to "✓" for objectives list items');
console.log('Now objectives boxes will show proper check marks ✓ like pages 1-6');
