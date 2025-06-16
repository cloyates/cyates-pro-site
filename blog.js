// Blog functionality for I KNOW NØTHING! LABS
class BlogManager {
    constructor() {
        this.blogPosts = [
            {
                title: "AI-Powered CLI Development for Non-Coders",
                slug: "ai-cli-development-for-non-coders",
                excerpt: "Building command-line tools used to require years of programming experience. Not anymore. With AI assistants like ChatGPT, Ghostwriter, and Replit Agent, anyone can create powerful CLI applications from scratch.",
                publishDate: "January 2025",
                content: null // Will be loaded dynamically from markdown
            },
            {
                title: "Building api_vault: Encrypted CLI for API Key Management",
                slug: "building-api-vault-cli",
                excerpt: "Managing API keys securely is a nightmare. Storing them in files, environment variables, or worse—hardcoding them—creates security risks. So I built api_vault, an encrypted CLI tool for secure API key storage.",
                publishDate: "January 2025",
                content: null
            },
            {
                title: "CLI Starter Kit: Your First AI-Assisted Command Line Tool",
                slug: "cli-starter-kit-guide",
                excerpt: "Starting CLI development can feel overwhelming. Where do you begin? What structure should you use? This minimal starter kit removes the guesswork and gets you building immediately.",
                publishDate: "January 2025",
                content: null
            }
        ];
    }

    async loadBlogContent(slug) {
        // PostgreSQL placeholder: Replace with database query
        // Example: SELECT content FROM blog_posts WHERE slug = $1
        try {
            const response = await fetch(`/blog/${slug}.md`);
            if (response.ok) {
                return await response.text();
            }
        } catch (error) {
            console.log(`Could not load blog content for ${slug}:`, error);
        }
        return null;
    }

    renderBlogPosts() {
        const blogContainer = document.getElementById('blog-posts');
        if (!blogContainer) return;

        // Clear existing content
        blogContainer.innerHTML = '';

        // Render blog post previews
        this.blogPosts.forEach(post => {
            const blogPostElement = this.createBlogPostElement(post);
            blogContainer.appendChild(blogPostElement);
        });
    }

    createBlogPostElement(post) {
        const article = document.createElement('article');
        article.className = 'blog-post';
        
        article.innerHTML = `
            <div class="meta">${post.publishDate}</div>
            <h4>${post.title}</h4>
            <p class="excerpt">${post.excerpt}</p>
            <a href="#" class="read-more-btn" data-slug="${post.slug}">Read More →</a>
        `;

        // Add click handler for "Read More" button
        const readMoreBtn = article.querySelector('.read-more-btn');
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showFullPost(post.slug);
        });

        return article;
    }

    async showFullPost(slug) {
        // Future enhancement: Open modal or navigate to full post page
        // For now, show alert - this would be replaced with proper routing
        const post = this.blogPosts.find(p => p.slug === slug);
        if (post) {
            alert(`Opening "${post.title}"\n\nIn a full implementation, this would open the complete blog post with full markdown content rendering.`);
        }
    }

    // PostgreSQL integration methods (for future implementation)
    async saveBlogPost(postData) {
        // Placeholder for database insertion
        // INSERT INTO blog_posts (title, slug, content, excerpt, published_date) VALUES ($1, $2, $3, $4, $5)
        console.log('PostgreSQL placeholder: saveBlogPost', postData);
    }

    async getBlogPostsFromDB() {
        // Placeholder for database query
        // SELECT * FROM blog_posts WHERE published = true ORDER BY published_date DESC
        console.log('PostgreSQL placeholder: getBlogPostsFromDB');
        return this.blogPosts; // Fallback to static data
    }

    async updateBlogPost(slug, postData) {
        // Placeholder for database update
        // UPDATE blog_posts SET title = $1, content = $2, excerpt = $3 WHERE slug = $4
        console.log('PostgreSQL placeholder: updateBlogPost', slug, postData);
    }
}

// Initialize blog functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const blogManager = new BlogManager();
    blogManager.renderBlogPosts();
});

// Export for potential server-side usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogManager;
}