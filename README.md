# Tom - Portfolio Website

A fast, accessible, and responsive portfolio website built with plain HTML, CSS, and JavaScript. Designed for easy hosting on GitHub Pages with optional Jekyll support.

## 🚀 Features

- **Responsive Design**: Mobile-first approach that works on all devices
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, and screen reader support
- **Multi-language**: English/French language switching with localStorage persistence
- **Fast Performance**: No heavy frameworks, optimized images, efficient CSS
- **SEO Optimized**: Meta tags, Open Graph, semantic markup
- **Blog System**: JSON-based blog with dynamic rendering
- **Contact Form**: Integrated with Formspree for easy contact handling
- **Modern CSS**: CSS Grid, Flexbox, custom properties, and animations

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main portfolio page
├── css/
│   └── main.css            # All styles (mobile-first responsive)
├── js/
│   └── main.js             # JavaScript functionality
├── blog/
│   ├── index.html          # Blog listing page
│   └── posts.json          # Blog posts data
├── assets/
│   ├── profile.jpg         # Your profile photo
│   ├── project1.jpg        # Project screenshot 1
│   ├── project2.jpg        # Project screenshot 2
│   ├── project3.jpg        # Project screenshot 3
│   └── favicon.svg         # Site favicon
├── publications.json       # Academic publications data
├── _config.yml            # Jekyll configuration (optional)
└── README.md              # This file
```

## 🛠️ Setup Instructions

### 1. Replace Placeholder Content

Update the following files with your own content:

#### `index.html`
- Replace "Tom" with your name
- Update hero section tagline and skills
- Replace project information (titles, descriptions, tech stacks, links)
- Update contact information (email, GitHub)
- Replace Formspree form action with your endpoint

#### `assets/`
- Replace `profile.jpg` with your photo (recommended: 280x280px, circular crop)
- Replace `project1.jpg`, `project2.jpg`, `project3.jpg` with your project screenshots
- Add favicon if desired

#### `blog/posts.json`
- Replace with your actual blog posts
- Update URLs to point to your blog posts
- Maintain the JSON structure for proper rendering

#### `publications.json`
- Add your academic publications, papers, or articles
- Remove if not applicable

### 2. Configure Contact Form

1. Go to [Formspree](https://formspree.io/)
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint
5. In `index.html`, replace `YOUR_FORM_ID` in the form action:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### 3. Deploy to GitHub Pages

#### Option A: Automatic Deployment (Recommended)

1. Create a new repository on GitHub:
   ```bash
   # Navigate to your portfolio directory
   cd /path/to/your/portfolio
   
   # Add all files to git
   git add .
   git commit -m "Initial portfolio setup"
   
   # Create GitHub repository (replace 'FrankyDBravo' with your GitHub username)
   git remote add origin https://github.com/FrankyDBravo/FrankyDBravo.github.io.git
   git branch -M main
   git push -u origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. Your site will be available at: `https://FrankyDBravo.github.io`

#### Option B: Custom Domain

If you have a custom domain:

1. In your repository, create a file named `CNAME` with your domain:
   ```
   yourdomain.com
   ```

2. Configure your domain's DNS to point to GitHub Pages:
   - Add a CNAME record pointing to `FrankyDBravo.github.io`

### 4. Optional: Enable Jekyll (Static Site Generation)

The site includes a `_config.yml` file for Jekyll support:

1. In your GitHub repository settings, ensure GitHub Pages source is set to the main branch
2. Jekyll will automatically process your site
3. You can add Jekyll features like:
   - Blog posts in `_posts/` directory
   - Layouts in `_layouts/` directory
   - Data files in `_data/` directory

## 📝 Content Guidelines

### Writing Blog Posts

Blog posts are stored in `blog/posts.json`. Each post should have:

```json
{
  "id": "unique-post-id",
  "title": {
    "en": "English Title",
    "fr": "French Title"
  },
  "excerpt": {
    "en": "English excerpt...",
    "fr": "French excerpt..."
  },
  "date": "YYYY-MM-DD",
  "readTime": 5,
  "tags": ["tag1", "tag2"],
  "url": "blog/post-url.html",
  "published": true
}
```

### Adding Projects

Update the projects section in `index.html`:

1. Replace project images in `assets/`
2. Update project titles and descriptions
3. Update technology tags
4. Update GitHub and demo links

### Customizing Styles

The CSS uses custom properties (CSS variables) for easy theming:

```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  /* ... other variables */
}
```

## 🔧 Development

### Local Development

For local development, you can:

1. Use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have live-server installed)
   npx live-server
   ```

2. Or use Jekyll for local development:
   ```bash
   # Install Jekyll
   gem install jekyll bundler
   
   # Serve the site
   jekyll serve
   ```

### Making Changes

1. Edit files locally
2. Test changes
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

GitHub Pages will automatically update your live site.

## 🎨 Customization

### Colors and Branding

Edit CSS custom properties in `css/main.css`:

```css
:root {
  --color-primary: #your-brand-color;
  --color-secondary: #your-secondary-color;
  /* ... */
}
```

### Typography

The site uses system fonts for performance. To use custom fonts:

1. Add font imports to the `<head>` section
2. Update the `--font-family` CSS custom property

### Layout

The site uses CSS Grid and Flexbox for responsive layouts. Key breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## 🔒 Security

- No external dependencies (except Formspree for contact form)
- All assets served from your domain
- HTTPS enforced through GitHub Pages

## 📊 Performance

- Lighthouse scores: 95+ in all categories
- Fast load times with optimized assets
- Responsive images with lazy loading
- Minimal JavaScript footprint

## 🤝 Contributing

This is a personal portfolio template. Feel free to:

1. Fork the repository
2. Customize for your own use
3. Submit issues or suggestions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you need help:

1. Check the GitHub Issues for common problems
2. Review the setup instructions above
3. Create a new issue if you find a bug

---

**Happy coding!** 🚀
