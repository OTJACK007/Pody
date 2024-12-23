import { Client } from "@notionhq/client";

const NOTION_CLIENT_ID = '164d872b-594c-804a-8bae-003728fc272e';
const NOTION_CLIENT_SECRET = 'secret_azeMrgewQx1PE7W8rpsj9xhvI4OlUcrhn7gzwMahoFX';
const REDIRECT_URI = 'https://shogun360.netlify.app/auth/notion/callback';

export interface NotionPage {
  id: string;
  title: string;
  icon?: string;
  lastUpdated: string;
}

export interface NotionBlock {
  type: 'heading_2' | 'heading_3' | 'paragraph';
  content: string;
  link?: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    color?: string;
  };
}

class NotionService {
  private client: Client | null = null;
  private accessToken: string | null = null;

  private readonly clientId = import.meta.env.VITE_NOTION_CLIENT_ID;
  private readonly clientSecret = import.meta.env.VITE_NOTION_CLIENT_SECRET;
  private readonly redirectUri = import.meta.env.VITE_NOTION_REDIRECT_URI;

  constructor() {
    // Initialize with stored token if available
    const storedToken = localStorage.getItem('notion_access_token');
    if (storedToken) {
      this.accessToken = storedToken;
      this.client = new Client({ auth: storedToken });
    }
  }

  getAuthUrl() {
    return `https://api.notion.com/v1/oauth/authorize?client_id=${this.clientId}&response_type=code&owner=user&redirect_uri=${encodeURIComponent(this.redirectUri)}`;
  }

  async handleAuthCallback(code: string) {
    try {
      const response = await fetch('https://api.notion.com/v1/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUri,
        }),
      });

      const data = await response.json();
      this.accessToken = data.access_token;
      localStorage.setItem('notion_access_token', data.access_token);
      this.client = new Client({ auth: data.access_token });

      return true;
    } catch (error) {
      console.error('Error handling Notion auth callback:', error);
      return false;
    }
  }

  async getPages(): Promise<NotionPage[]> {
    if (!this.client) throw new Error('Not authenticated with Notion');

    try {
      const response = await this.client.search({
        filter: { property: 'object', value: 'page' },
      });

      return response.results.map((page: any) => ({
        id: page.id,
        title: page.properties.title?.title[0]?.plain_text || 'Untitled',
        icon: page.icon?.emoji || page.icon?.file?.url,
        lastUpdated: page.last_edited_time,
      }));
    } catch (error) {
      console.error('Error fetching Notion pages:', error);
      throw error;
    }
  }

  async createPage(title: string): Promise<string> {
    if (!this.client) throw new Error('Not authenticated with Notion');

    try {
      const response = await this.client.pages.create({
        parent: { type: 'workspace', workspace: true },
        properties: {
          title: {
            title: [{ text: { content: title } }],
          },
        },
      });

      return response.id;
    } catch (error) {
      console.error('Error creating Notion page:', error);
      throw error;
    }
  }

  async appendBlocks(pageId: string, blocks: NotionBlock[]) {
    if (!this.client) throw new Error('Not authenticated with Notion');

    try {
      const children = blocks.map(block => {
        const baseBlock = {
          [block.type]: {
            rich_text: [{
              text: {
                content: block.content,
                ...(block.link ? { link: { url: block.link } } : {}),
              },
              ...(block.annotations || {}),
            }],
          },
        };

        return baseBlock;
      });

      await this.client.blocks.children.append({
        block_id: pageId,
        children,
      });
    } catch (error) {
      console.error('Error appending blocks to Notion page:', error);
      throw error;
    }
  }

  async extractContentToNotion(pageId: string, content: any) {
    if (!this.client) throw new Error('Not authenticated with Notion');

    try {
      // Create blocks for overview sections
      const overviewBlocks: NotionBlock[] = [];
      
      content.overview_section?.forEach((section: any) => {
        // Add section title
        overviewBlocks.push({
          type: 'heading_2',
          content: section.title,
        });

        // Add section content
        overviewBlocks.push({
          type: 'paragraph',
          content: section.content,
        });

        // Add key points
        if (section.key_points?.length) {
          overviewBlocks.push({
            type: 'heading_3',
            content: 'Key Points',
          });

          section.key_points.forEach((point: string) => {
            overviewBlocks.push({
              type: 'paragraph',
              content: `• ${point}`,
            });
          });
        }

        // Add detailed points
        if (section.detailed_points?.length) {
          section.detailed_points.forEach((point: any) => {
            overviewBlocks.push({
              type: 'heading_3',
              content: point.title,
            });
            overviewBlocks.push({
              type: 'paragraph',
              content: point.content,
            });
          });
        }
      });

      // Create blocks for deep dive sections
      const deepDiveBlocks: NotionBlock[] = [];
      
      content.deepdive_section?.forEach((section: any) => {
        // Add section title
        deepDiveBlocks.push({
          type: 'heading_2',
          content: section.title,
        });

        // Add section content
        deepDiveBlocks.push({
          type: 'paragraph',
          content: section.content,
        });

        // Add key points
        if (section.key_points?.length) {
          deepDiveBlocks.push({
            type: 'heading_3',
            content: 'Deep Dive Points',
          });

          section.key_points.forEach((point: string) => {
            deepDiveBlocks.push({
              type: 'paragraph',
              content: `• ${point}`,
            });
          });
        }

        // Add detailed points
        if (section.detailed_points?.length) {
          section.detailed_points.forEach((point: any) => {
            deepDiveBlocks.push({
              type: 'heading_3',
              content: point.title,
            });
            deepDiveBlocks.push({
              type: 'paragraph',
              content: point.content,
            });
          });
        }
      });

      // Append all blocks
      await this.appendBlocks(pageId, [...overviewBlocks, ...deepDiveBlocks]);

      return true;
    } catch (error) {
      console.error('Error extracting content to Notion:', error);
      throw error;
    }
  }

  isAuthenticated() {
    return !!this.accessToken;
  }

  disconnect() {
    this.accessToken = null;
    this.client = null;
    localStorage.removeItem('notion_access_token');
  }
}

export const notionService = new NotionService();