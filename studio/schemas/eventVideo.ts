import { defineField, defineType } from "sanity";

const VIDEO_TAGS = ["Royal Visit", "Ojude Oba", "Carnival", "Community", "Live Stream", "Performance"];

export default defineType({
  name: "eventVideo",
  title: "Event Video",
  type: "document",
  fields: [
    defineField({ name: "id", title: "ID", type: "number", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "videoFile", title: "Video File (local)", type: "file", options: { accept: "video/*" } }),
    defineField({ name: "youtubeId", title: "YouTube Video ID", type: "string" }),
    defineField({ name: "date", title: "Date / Event Label", type: "string" }),
    defineField({ name: "credit", title: "Credit", type: "string" }),
    defineField({ name: "tag", title: "Tag", type: "string", options: { list: VIDEO_TAGS }, validation: (r) => r.required() }),
    defineField({ name: "featured", title: "Featured?", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "tag" },
  },
});
