const fs = require('fs');
const path = require('path');

const mobileStyles = `

  /* ==================================================
     MOBILE RESPONSIVE DESIGN
     ================================================== */
  
  /* Medium screens (tablets) */
  @media (max-width: 1024px) {
    .container { 
      max-width: 95%; 
      padding: 0 1.5rem;
    }
    
    .guide-content {
      padding: 0 1rem;
    }
    
    .guide-section {
      margin-bottom: 3rem;
    }
  }

  /* Small screens (mobile landscape) */
  @media (max-width: 768px) {
    .container { 
      max-width: 95%; 
      padding: 0 1rem;
    }
    
    body {
      background-attachment: scroll !important;
    }
    
    .header-content {
      padding: 1rem;
      flex-direction: column;
      gap: 1rem;
    }
    
    .logo {
      font-size: 1.4rem;
      letter-spacing: 2px;
    }
    
    .nav {
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.3rem;
    }
    
    .nav a {
      padding: 0.5rem 0.6rem;
      font-size: 0.8rem;
    }
    
    .guide-content {
      padding: 2rem 1rem;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    
    .section-title {
      font-size: 2rem !important;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .guide-section {
      margin-bottom: 2.5rem;
    }
    
    .guide-section h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }
    
    .guide-section h4 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }
    
    .guide-section p {
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .guide-section ul, ol {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }
    
    .guide-section li {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    /* Tablets */
    .guide-table {
      width: 100%;
      overflow-x: auto;
      display: block;
      white-space: nowrap;
      margin: 1.5rem 0;
    }
    
    .guide-table table {
      min-width: 500px;
      width: 100%;
    }
    
    /* Code blocks */
    .code-block {
      font-size: 0.8rem;
      padding: 1rem;
      margin: 1rem 0;
      overflow-x: auto;
    }
    
    /* Footer adjustments */
    .footer-content {
      flex-direction: column;
      gap: 1.5rem;
      text-align: center;
      padding: 2rem 1rem;
    }
    
    .footer-buttons {
      flex-direction: column;
      gap: 0.8rem;
      align-items: center;
    }

    /* Music control for mobile */
    .music-control-panel {
      width: 90vw !important;
      max-width: 300px !important;
      bottom: 80px !important;
      right: 5vw !important;
    }
    
    #musicControlButton {
      bottom: 15px !important;
      right: 15px !important;
      padding: 10px 15px !important;
      font-size: 12px !important;
    }
  }

  /* Very small screens (mobile portrait) */
  @media (max-width: 480px) {
    .container {
      padding: 0 0.8rem;
      max-width: 100%;
    }
    
    .header-content {
      padding: 0.8rem 0.5rem;
    }
    
    .logo {
      font-size: 1.2rem;
      letter-spacing: 1px;
    }
    
    .nav {
      gap: 0.2rem;
    }
    
    .nav a {
      padding: 0.4rem 0.5rem;
      font-size: 0.75rem;
    }
    
    .guide-content {
      padding: 1.5rem 0.5rem;
      font-size: 0.85rem;
    }
    
    .section-title {
      font-size: 1.5rem !important;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    
    .guide-section {
      margin-bottom: 2rem;
    }
    
    .guide-section h3 {
      font-size: 1.2rem;
      margin-bottom: 0.8rem;
    }
    
    .guide-section h4 {
      font-size: 1rem;
      margin-bottom: 0.6rem;
    }
    
    .guide-section p {
      margin-bottom: 0.8rem;
      font-size: 0.85rem;
      line-height: 1.5;
    }
    
    .guide-section ul, ol {
      margin: 0.8rem 0;
      padding-left: 1.25rem;
    }
    
    .guide-section li {
      margin-bottom: 0.4rem;
      font-size: 0.85rem;
    }
    
    /* Large buttons for touch */
    .btn, .step-number {
      min-height: 44px;
      min-width: 44px;
      padding: 0.8rem 1rem;
      font-size: 0.85rem;
    }
    
    /* Tables - horizontal scroll */
    .guide-table {
      font-size: 0.8rem;
      margin: 1rem 0;
    }
    
    .guide-table th,
    .guide-table td {
      padding: 0.5rem 0.3rem;
      white-space: nowrap;
    }
    
    /* Code blocks */
    .code-block {
      font-size: 0.75rem;
      padding: 0.8rem;
      margin: 0.8rem 0;
    }
    
    /* Images */
    img {
      max-width: 100%;
      height: auto;
    }
    
    /* Footer */
    .footer-content {
      padding: 1.5rem 0.5rem;
    }
    
    .footer-btn {
      padding: 0.8rem 1.2rem;
      font-size: 0.8rem;
    }
    
    /* Warning boxes */
    .warning-box,
    .critical-sequence,
    .urgent-warning {
      padding: 1rem;
      margin: 1rem 0;
      font-size: 0.85rem;
    }
    
    .warning-box h4,
    .critical-sequence h3,
    .urgent-warning h3 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }
  }

  /* Ultra small screens */
  @media (max-width: 320px) {
    .nav a { 
      padding: 0.3rem 0.4rem; 
      font-size: 0.7rem; 
    }
    
    .guide-content {
      padding: 1rem 0.3rem;
      font-size: 0.8rem;
    }
    
    .section-title {
      font-size: 1.3rem !important;
    }
  }

  /* Touch device improvements */
  @media (hover: none) and (pointer: coarse) {
    .btn:hover,
    .nav a:hover,
    .quick-link-item:hover {
      transform: none !important;
    }
    
    .btn:active {
      background: rgba(139, 0, 0, 0.8) !important;
      transform: scale(0.98);
    }
  }

  /* Landscape orientation on phones */
  @media (max-height: 600px) and (orientation: landscape) {
    .guide-content {
      padding: 1rem 0.5rem;
    }
    
    .section-title {
      font-size: 1.5rem !important;
      margin-bottom: 1rem;
    }
    
    .guide-section {
      margin-bottom: 1.5rem;
    }
    
    .guide-section h3 {
      font-size: 1.1rem;
    }
  }

  /* Print styles */
  @media print {
    .header, .footer, #musicControlButton, .music-control-panel {
      display: none !important;
    }
    
    .guide-content {
      padding: 0;
      font-size: 12pt;
    }
    
    body {
      background: white !important;
      color: black !important;
    }
  }`;

// List of files to update
const htmlFiles = [
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

console.log('Adding mobile responsive styles to all pages...\\n');

htmlFiles.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update viewport meta tag for better mobile support
    content = content.replace(
      /<meta name="viewport" content="[^"]*">/,
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'
    );
    
    // Add mobile styles before closing </style> tag
    const styleEndIndex = content.lastIndexOf('</style>');
    if (styleEndIndex !== -1) {
      content = content.slice(0, styleEndIndex) + mobileStyles + '\\n' + content.slice(styleEndIndex);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Added mobile styles to ${fileName}`);
    } else {
      console.log(`⚠ No </style> tag found in ${fileName}`);
    }
  } else {
    console.log(`⚠ File not found: ${fileName}`);
  }
});

console.log('\\n🎉 Enhanced mobile responsiveness across all pages!');
console.log('📱 Features added:');
console.log('   • Responsive layouts for tablets and phones');
console.log('   • Touch-friendly button sizes');
console.log('   • Optimized typography and spacing');
console.log('   • Horizontal scrolling tables');
console.log('   • Mobile-optimized music controls');
console.log('   • Touch device hover fixes');
console.log('   • Landscape orientation support');
