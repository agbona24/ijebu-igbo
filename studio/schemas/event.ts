import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date (display string)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "time", title: "Time", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "upcoming", title: "Upcoming?", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
