export interface MediumPost {
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  isExternal?: boolean;
}

export const mediumPosts: MediumPost[] = [
  // Add your posts here
  // Example:
  // {
  //   title: "Your Post Title",
  //   url: "https://medium.com/@yourhandle/post-slug",
  //   publishedAt: "2025-01-01",
  //   summary: "A brief summary of your post.",
  //   tags: ["Tag1", "Tag2"],
  //   isExternal: true
  // },
];

export function getMediumPosts(): MediumPost[] {
  return mediumPosts;
} 