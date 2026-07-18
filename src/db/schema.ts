import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";

/** Project & consultation enquiries submitted through the contact form. */
export const inquiries = pgTable("inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  projectType: text("project_type"),
  location: text("location"),
  area: text("area"),
  services: text("services"),
  startDate: text("start_date"),
  budget: text("budget"),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** Global site settings — theme, content, page-builder, integrations config. */
export const settings = pgTable("settings", {
  id: text("id").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** AI assistant conversation logs. */
export const chatLogs = pgTable("chat_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** Admin dashboard users — database-managed login (bypasses env variables). */
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(), // salt:scryptHash
  role: text("role").default("admin").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** Consultation / site-visit appointments booked via the AI assistant. */
export const appointments = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").notNull(),
  companyName: text("company_name"),
  location: text("location"),
  service: text("service"),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  notes: text("notes"),
  source: text("source").default("ai-assistant").notNull(),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
export type Settings = typeof settings.$inferSelect;
export type ChatLog = typeof chatLogs.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
