const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'quick-reference-guide.html', 
  'remake_guide_page_1.html',
  'remake_guide_page_2.html',
  'remake_guide_page_3.html',
  'remake_guide_page_4.html',
  'remake_guide_page_5.html',
  'remake_guide_page_6.html',
  'remake_guide_page_7.html',
  'remake_guide_page_8.html',
  'remake_guide_page_9.html',
  'remake_guide_page_10.html',
  'remake_guide_page_11.html',
  'remake_guide_page_12.html',
  'remake_guide_page_13.html',
  'remake_guide_page_14.html',
  'remake_guide_page_15.html',
  'remake_guide_page_16.html',
  'resources-page.html'
];

htmlFiles.forEach(fileName => {
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName, 'utf8');
    
    // Replace all links to remake_index_page.html with index.html
    const updatedContent = content.replace(/remake_index_page\.html/g, 'index.html');
    
    fs.writeFileSync(fileName, updatedContent, 'utf8');
    console.log(`✓ Updated links in ${fileName}`);
  }
});

console.log('\\n🎉 All navigation links updated! Your site should now work properly on GitHub Pages.');
console.log('📝 Don\\'t forget to push these changes to GitHub:');
console.log('   git add .');
console.log('   git commit -m "Fix GitHub Pages: rename main page to index.html and update links"');
console.log('   git push origin main');
