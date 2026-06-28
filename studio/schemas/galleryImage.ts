import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", title: "Alt Text", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "alt", media: "image" },
  },
});
