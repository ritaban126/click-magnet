import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const generations = pgTable("generations", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull(),
  sourceImageUrl: text("source_image_url").notNull(),
  resultImageUrl: text("result_image_url").notNull(),
  styleSlug: text("style_slug").notNull(),
  styleLabel: text("style_label").notNull(),
  model: text("model").notNull(),
  promptUsed: text("prompt_used").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// for saved history
// export const savedGenerations = pgTable("saved_generations", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   clerkUserId: text("clerk_user_id").notNull(),
//   generationId: uuid("generation_id").notNull(),
//   // references generations.id
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .defaultNow()
//     .notNull(),
// });

// user usage limit
// export const userUsage = pgTable("user_usage", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   clerkUserId: text("clerk_user_id").notNull().unique(),
//   credits: integer("credits").notNull().default(10),
//   totalGenerations: integer("total_generations").notNull().default(0),
//   plan: text("plan").notNull().default("free"),
//   lastResetAt: timestamp("last_reset_at", { withTimezone: true })
//     .defaultNow()
//     .notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true })
//     .defaultNow()
//     .notNull(),
// });