import { defineField, defineType } from "sanity";

export default defineType({
  name: "king",
  title: "Ruler / Oba",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "fullTitle", title: "Full Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "author", title: "Article Author", type: "string" }),
    defineField({ name: "reign", title: "Reign Label", type: "string" }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["Previous", "Present"] } }),
    defineField({ name: "photo", title: "Primary Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "photos", title: "Additional Photos", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "hometown", title: "Hometown", type: "string" }),
    defineField({ name: "born", title: "Born", type: "string" }),
    defineField({ name: "died", title: "Died", type: "string" }),
    defineField({ name: "quote", title: "Notable Quote", type: "text" }),
    defineField({ name: "quoteAuthor", title: "Quote Author", type: "string" }),
    defineField({ name: "biography", title: "Biography Paragraphs", type: "array", of: [{ type: "text" }] }),
    defineField({
      name: "achievements",
      title: "Achievements",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "year", title: "Year", type: "string" }),
          defineField({ name: "event", title: "Event", type: "text" }),
        ],
      }],
    }),
    defineField({ name: "titles", title: "Titles", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "name", subtitle: "reign", media: "photo" },
  },
});
