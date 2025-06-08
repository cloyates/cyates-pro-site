const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

// Simple routing for static files and API
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  // Handle API endpoints
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');
    
    if (pathname === '/api/contact' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => {
        try {
          const formData = querystring.parse(body);
          
          // Import storage dynamically to avoid module issues
          const { storage } = await import('./storage.js');
          
          const submission = await storage.createContactSubmission({
            name: formData.name,
            email: formData.email,
            company: formData.company || null,
            message: formData.message
          });
          
          res.writeHead(200);
          res.end(JSON.stringify({ 
            success: true, 
            message: 'Thank you for your message! I\'ll get back to you within 24 hours.',
            id: submission.id 
          }));
        } catch (error) {
          console.error('Error saving contact submission:', error);
          res.writeHead(500);
          res.end(JSON.stringify({ 
            success: false, 
            message: 'There was an error sending your message. Please try again.' 
          }));
        }
      });
      return;
    }
    
    if (pathname === '/api/projects' && req.method === 'GET') {
      try {
        const { storage } = await import('./storage.js');
        const projects = await storage.getFeaturedProjects();
        
        res.writeHead(200);
        res.end(JSON.stringify(projects));
      } catch (error) {
        console.error('Error fetching projects:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to fetch projects' }));
      }
      return;
    }
    
    if (pathname === '/api/lab-posts' && req.method === 'GET') {
      try {
        const { storage } = await import('./storage.js');
        const posts = await storage.getPublishedLabPosts();
        
        res.writeHead(200);
        res.end(JSON.stringify(posts));
      } catch (error) {
        console.error('Error fetching lab posts:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to fetch lab posts' }));
      }
      return;
    }
    
    // 404 for unknown API endpoints
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  // Serve static files
  let filePath = '.' + pathname;
  if (pathname === '/') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.md': 'text/markdown'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});