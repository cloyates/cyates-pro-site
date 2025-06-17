import { users, contactSubmissions, projects, labPosts, blogPosts } from "../shared/schema.js";
import { db } from "./db.js";
import { eq, desc } from "drizzle-orm";

export class DatabaseStorage {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser) {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(submission) {
    const [contactSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return contactSubmission;
  }

  async getContactSubmissions() {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmission(id) {
    const [submission] = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id));
    return submission || undefined;
  }

  async getProjects() {
    return await db
      .select()
      .from(projects)
      .orderBy(projects.displayOrder, desc(projects.createdAt));
  }

  async getFeaturedProjects() {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(projects.displayOrder, desc(projects.createdAt));
  }

  async getProject(id) {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(project) {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async getLabPosts() {
    return await db
      .select()
      .from(labPosts)
      .orderBy(desc(labPosts.createdAt));
  }

  async getPublishedLabPosts() {
    return await db
      .select()
      .from(labPosts)
      .where(eq(labPosts.published, true))
      .orderBy(desc(labPosts.publishedAt));
  }

  async getLabPost(id) {
    const [post] = await db
      .select()
      .from(labPosts)
      .where(eq(labPosts.id, id));
    return post || undefined;
  }

  async createLabPost(post) {
    const [newPost] = await db
      .insert(labPosts)
      .values(post)
      .returning();
    return newPost;
  }

  async getBlogPosts() {
    return await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts() {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id) {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug) {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(post) {
    const [newPost] = await db
      .insert(blogPosts)
      .values(post)
      .returning();
    return newPost;
  }
}

export const storage = new DatabaseStorage();