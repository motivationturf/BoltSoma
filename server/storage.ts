import { 
  users, 
  challenges, 
  challengeParticipants,
  type User, 
  type InsertUser,
  type Challenge,
  type InsertChallenge,
  type ChallengeParticipant,
  type InsertChallengeParticipant
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Challenge methods
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  getChallengeByCode(inviteCode: string): Promise<Challenge | undefined>;
  getChallenge(id: number): Promise<Challenge | undefined>;
  getUserChallenges(userId: number): Promise<Challenge[]>;
  updateChallengeStatus(id: number, status: string): Promise<void>;
  
  // Challenge participant methods
  joinChallenge(participation: InsertChallengeParticipant): Promise<ChallengeParticipant>;
  getChallengeParticipants(challengeId: number): Promise<ChallengeParticipant[]>;
  updateParticipantProgress(challengeId: number, userId: number, data: Partial<ChallengeParticipant>): Promise<void>;
  getUserParticipations(userId: number): Promise<ChallengeParticipant[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Challenge methods
  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    // Generate unique invite code
    const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const [newChallenge] = await db
      .insert(challenges)
      .values({ ...challenge, inviteCode })
      .returning();
    return newChallenge;
  }

  async getChallengeByCode(inviteCode: string): Promise<Challenge | undefined> {
    const [challenge] = await db
      .select()
      .from(challenges)
      .where(eq(challenges.inviteCode, inviteCode));
    return challenge || undefined;
  }

  async getChallenge(id: number): Promise<Challenge | undefined> {
    const [challenge] = await db
      .select()
      .from(challenges)
      .where(eq(challenges.id, id));
    return challenge || undefined;
  }

  async getUserChallenges(userId: number): Promise<Challenge[]> {
    return await db
      .select()
      .from(challenges)
      .where(eq(challenges.creatorId, userId));
  }

  async updateChallengeStatus(id: number, status: string): Promise<void> {
    await db
      .update(challenges)
      .set({ 
        status,
        startedAt: status === 'active' ? new Date() : undefined,
        completedAt: status === 'completed' ? new Date() : undefined
      })
      .where(eq(challenges.id, id));
  }

  // Challenge participant methods
  async joinChallenge(participation: InsertChallengeParticipant): Promise<ChallengeParticipant> {
    const [participant] = await db
      .insert(challengeParticipants)
      .values(participation)
      .returning();
    return participant;
  }

  async getChallengeParticipants(challengeId: number): Promise<ChallengeParticipant[]> {
    return await db
      .select()
      .from(challengeParticipants)
      .where(eq(challengeParticipants.challengeId, challengeId));
  }

  async updateParticipantProgress(challengeId: number, userId: number, data: Partial<ChallengeParticipant>): Promise<void> {
    await db
      .update(challengeParticipants)
      .set(data)
      .where(
        and(
          eq(challengeParticipants.challengeId, challengeId),
          eq(challengeParticipants.userId, userId)
        )
      );
  }

  async getUserParticipations(userId: number): Promise<ChallengeParticipant[]> {
    return await db
      .select()
      .from(challengeParticipants)
      .where(eq(challengeParticipants.userId, userId));
  }
}

export const storage = new DatabaseStorage();
