CREATE TYPE "public"."taskStatus" AS ENUM('PENDING', 'COMPLETED');--> statement-breakpoint
CREATE TABLE "task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"status" "taskStatus" DEFAULT 'PENDING' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"completedAt" timestamp DEFAULT now()
);
