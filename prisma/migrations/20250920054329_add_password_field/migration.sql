/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- Add password column with default value
ALTER TABLE "public"."users" ADD COLUMN "password" TEXT NOT NULL DEFAULT 'temp-password';

-- Update existing users to have a temporary password (they'll need to reset)
UPDATE "public"."users" SET "password" = 'temp-password' WHERE "password" = 'temp-password';

-- Remove the default constraint
ALTER TABLE "public"."users" ALTER COLUMN "password" DROP DEFAULT;
