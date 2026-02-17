// TOC Accordion Toggle (Mobile)
(function() {
  var toc = document.querySelector(".toc");
  var tocHeader = toc ? toc.querySelector("h3") : null;
  if (tocHeader) {
    tocHeader.addEventListener("click", function() {
      toc.classList.toggle("open");
    });
  }
})();
