import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username"), // Keep for backward compatibility, but make optional
  email: text("email").unique(), // Optional for guest accounts
  mobile: varchar("mobile", { length: 20 }).unique(), // Optional for mobile auth
  password: text("password"), // Optional for guest accounts
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  grade: varchar("grade", { length: 10 }),
  avatar: text("avatar"),
  isGuest: boolean("is_guest").default(false),
  guestExpiresAt: timestamp("guest_expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  lastLogin: timestamp("last_login"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const guestSessions = pgTable("guest_sessions", {
  id: serial("id").primaryKey(),
  sessionToken: text("session_token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
});

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").notNull(),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  topic: text("topic").notNull(),
  questionCount: integer("question_count").notNull(),
  timeLimit: integer("time_limit").notNull(), // in seconds
  inviteCode: varchar("invite_code", { length: 8 }).notNull().unique(),
  status: text("status").notNull().default("waiting"), // waiting, active, completed
  questions: jsonb("questions").notNull(), // array of questions
  maxParticipants: integer("max_participants").default(10),
  createdAt: timestamp("created_at").defaultNow(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
});

export const challengeParticipants = pgTable("challenge_participants", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").notNull(),
  userId: integer("user_id").notNull(),
  status: text("status").notNull().default("joined"), // joined, started, completed
  score: integer("score").default(0),
  timeElapsed: integer("time_elapsed"), // time taken in seconds
  answers: jsonb("answers"), // user's answers
  joinedAt: timestamp("joined_at").defaultNow(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
});

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(), // teacher
  recipientId: integer("recipient_id").notNull(), // student
  challengeId: integer("challenge_id"), // optional, for context
  lessonId: integer("lesson_id"), // optional, for context
  body: text("body").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(), // teacher
  targetGrade: text("target_grade").notNull(),
  targetSubject: text("target_subject"), // optional
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  createdChallenges: many(challenges),
  participations: many(challengeParticipants),
  guestSessions: many(guestSessions),
}));

export const guestSessionsRelations = relations(guestSessions, ({ one }) => ({
  user: one(users, {
    fields: [guestSessions.id], // This will need to be updated when we add user reference
    references: [users.id],
  }),
}));

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  creator: one(users, {
    fields: [challenges.creatorId],
    references: [users.id],
  }),
  participants: many(challengeParticipants),
}));

export const challengeParticipantsRelations = relations(challengeParticipants, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeParticipants.challengeId],
    references: [challenges.id],
  }),
  user: one(users, {
    fields: [challengeParticipants.userId],
    references: [users.id],
  }),
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  sender: one(users, { fields: [feedback.senderId], references: [users.id] }),
  recipient: one(users, { fields: [feedback.recipientId], references: [users.id] }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, { fields: [messages.senderId], references: [users.id] }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  mobile: true,
  password: true,
  firstName: true,
  lastName: true,
  grade: true,
  avatar: true,
  isGuest: true,
  guestExpiresAt: true,
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
  inviteCode: true,
  createdAt: true,
  startedAt: true,
  completedAt: true,
});

export const insertChallengeParticipantSchema = createInsertSchema(challengeParticipants).omit({
  id: true,
  joinedAt: true,
  startedAt: true,
  completedAt: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertGuestSessionSchema = createInsertSchema(guestSessions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GuestSession = typeof guestSessions.$inferSelect;
export type InsertGuestSession = z.infer<typeof insertGuestSessionSchema>;
export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type ChallengeParticipant = typeof challengeParticipants.$inferSelect;
export type InsertChallengeParticipant = z.infer<typeof insertChallengeParticipantSchema>;
export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
