const fs = require('fs');
const path = require('path');

// Get all HTML files
const files = fs.readdirSync('.').filter(file => file.endsWith('.html'));

console.log('Fixing all navigation links...\\n');

files.forEach(fileName => {
  const content = fs.readFileSync(fileName, 'utf8');
  
  // Replace ALL instances of remake_index_page.html with index.html
  const updatedContent = content.replace(/remake_index_page\.html/g, 'index.html');
  
  if (content !== updatedContent) {
    fs.writeFileSync(fileName, updatedContent, 'utf8');
    console.log(`✓ Fixed links in ${fileName}`);
  } else {
    console.log(`- No changes needed in ${fileName}`);
  }
});

console.log('\\n🎉 All navigation links have been updated!');
console.log('📝 Next steps:');
console.log('   1. git add .');
console.log('   2. git commit -m "Fix all navigation links to point to index.html"');
console.log('   3. git push origin main');
