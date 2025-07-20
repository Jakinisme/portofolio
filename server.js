const express = require('express');
const path = require('path');
const fs = require('fs');
const { minify } = require('html-minifier');

const app = express();
const PORT = process.env.PORT || 3000;

// Minify and serve any HTML file
app.get(/^.*\.html$/, (req, res, next) => {
  // Map URL to file path
  const filePath = path.join(__dirname, req.path);
  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) return next(); // Pass to next middleware (e.g., 404)
    const minified = minify(html, {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: false,
      removeEmptyAttributes: true,
      minifyJS: true
    });
    res.set('Content-Type', 'text/html');
    res.send(minified);
  });
});

// Serve static assets (img, css, js, etc.)
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
}); 