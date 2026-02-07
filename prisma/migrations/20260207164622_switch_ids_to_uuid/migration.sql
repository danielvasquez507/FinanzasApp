/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Recurring` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "notes" TEXT,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "week" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME
);
INSERT INTO "new_Transaction" ("amount", "category", "createdAt", "date", "deletedAt", "id", "isPaid", "notes", "sub", "week") SELECT "amount", "category", "createdAt", "date", "deletedAt", "id", "isPaid", "notes", "sub", "week" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_Recurring" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "owner" TEXT NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Recurring" ("amount", "deletedAt", "id", "name", "owner", "type") SELECT "amount", "deletedAt", "id", "name", "owner", "type" FROM "Recurring";
DROP TABLE "Recurring";
ALTER TABLE "new_Recurring" RENAME TO "Recurring";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
