# CY IT Works! - Business Website & Lab Platform

## Overview

This project is a business website for "CY IT Works!" with an integrated lab platform called "I KNOW NØTHING! LABS". The application serves as a portfolio site showcasing automation and AI tools for service businesses, while also providing a blog platform for experimental content and technical insights.

The architecture is designed as a full-stack web application with plans for PostgreSQL database integration through Drizzle ORM, though currently operating with a hybrid approach using file-based content and database preparation.

## System Architecture

### Frontend Architecture
- **Static Site**: HTML/CSS/JavaScript single-page application
- **Responsive Design**: Modern CSS with Inter font family and mobile-first approach
- **Blog System**: JavaScript-based blog manager with markdown content loading
- **Asset Management**: SVG logos and images served statically

### Backend Architecture
- **Node.js HTTP Server**: Custom server handling static files and API endpoints
- **Database Layer**: Drizzle ORM configured for PostgreSQL with Neon serverless
- **Storage Abstraction**: DatabaseStorage class providing data access layer
- **API Routes**: RESTful endpoints for contact forms and content management

### Database Design
- **Users Table**: User management with username, email, company fields
- **Contact Submissions**: Form submissions with status tracking
- **Projects Table**: Portfolio projects with categorization and ordering
- **Lab Posts**: Experimental content with publishing workflow

## Key Components

### 1. Web Server (`server/index.js`)
- HTTP server with custom routing
- Static file serving
- API endpoint handling
- Contact form processing

### 2. Database Integration (`server/db.js`, `server/storage.js`)
- Neon PostgreSQL connection with WebSocket support
- Drizzle ORM integration
- CRUD operations for all entities
- Error handling and connection management

### 3. Frontend Components
- **Navigation**: Fixed header with smooth scrolling
- **Hero Section**: Brand presentation with feature highlights
- **Blog System**: Dynamic markdown content loading
- **Contact Forms**: Integrated with backend API

### 4. Content Management
- **Blog Posts**: Markdown files in `/blog/` directory
- **Static Assets**: SVG logos and images
- **Schema Definition**: Centralized in `shared/schema.ts`

## Data Flow

1. **Static Content**: HTML/CSS/JS served directly by Node.js server
2. **Blog Content**: Markdown files loaded dynamically via fetch API
3. **Form Submissions**: POST to `/api/contact` → Database storage via Drizzle ORM
4. **Database Queries**: Storage layer abstracts Drizzle operations

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Database ORM and query builder
- **drizzle-kit**: Database migration and management tools
- **ws**: WebSocket support for Neon database connection

### Development Tools
- **Font Awesome**: Icon library for UI components
- **Google Fonts**: Inter font family for typography
- **Inkscape**: SVG graphics creation and editing

## Deployment Strategy

### Current Configuration
- **Replit Environment**: Node.js 20, Python 3.11, PostgreSQL 16
- **Port Configuration**: Internal port 5000, external port 80
- **Workflow**: Parallel execution with Node.js server startup
- **Database**: Configured for Neon PostgreSQL with environment variables

### Production Considerations
- Database URL must be set via environment variables
- WebSocket support required for Neon database connection
- Static assets served directly by Node.js (no CDN currently)
- Blog content served from filesystem (potential migration to database)

## Changelog
- June 16, 2025. Initial setup
- June 16, 2025. Updated services section to "Tech Handyman" brand with practical, outcome-driven language
- June 16, 2025. Rewrote About Me section to reflect blue-collar/sales background and AI obsession

## Recent Changes
- ✓ Services section transformed from "Featured Projects" to "Tech Handyman Services"
- ✓ Five services: Digital Tune-Up, Form Fix, AI Assistant Build, Website Visibility Boost, AI-Powered Lead Capture
- ✓ Navigation updated from "PROJECTS" to "SERVICES"
- ✓ Database updated with new service descriptions
- ✓ About Me section rewritten to emphasize sales/hands-on background and practical AI solutions
- ✓ Contact section title changed to "Let's Fix What's Slowing You Down"
- ✓ I KNOW NØTHING! LABS description updated to focus on documentation and knowledge sharing
- ✓ Footer completely revamped to match "Tech Handyman" brand with updated service links
- ✓ Brand positioning shifted to "Tech Handyman" - practical fixes over tech jargon

## User Preferences

Preferred communication style: Simple, everyday language.
Brand positioning: "Tech Handyman" - practical, outcome-driven solutions for small business owners.
Target audience: Blue-collar workers, small business owners who need automation but aren't technical.
Tone: Approachable, grounded in real-world usefulness, avoid tech jargon.