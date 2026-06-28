import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      options: {
        list: [
          { title: "Patron & Matron", value: "patronMatron" },
          { title: "Adviser", value: "adviser" },
          { title: "Current Executive", value: "currentExecutive" },
          { title: "Past President", value: "pastPresident" },
          { title: "Past Executive", value: "pastExecutive" },
          { title: "General Member", value: "general" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Group", name: "groupAsc", by: [{ field: "group", direction: "asc" }] },
  ],
});
