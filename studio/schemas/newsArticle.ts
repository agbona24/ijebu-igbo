import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    defineField({ name: "id", title: "Article ID (slug)", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "date", title: "Date", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "type", title: "Type", type: "string", options: { list: ["paragraph", "heading", "quote"] } }),
            defineField({ name: "text", title: "Text", type: "text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "asset", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "featuredImage" },
  },
});
