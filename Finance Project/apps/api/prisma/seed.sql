-- Seed data for Finance Receipt Platform
-- Run via: pnpm --filter api exec prisma db execute --file "apps/api/prisma/seed.sql"

INSERT INTO "Organization" (id, name, locale, "createdAt", "updatedAt")
VALUES
  ('org-church-001', 'Église Nouvelle Vie', 'fr-CA', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO "User" (id, email, "passwordHash", "displayName", language, "createdAt", "updatedAt")
VALUES
  ('user-finsec-001', 'finance.secretary@example.org', '$2a$10$LCxE1cwCv3sQTGFMlnbyDu1lF0S9Wv0VwEtkcNxFromJj0m9miX1i', 'Finance Secretary', 'fr', NOW(), NOW()),
  ('user-steward-001', 'steward@example.org', '$2a$10$LCxE1cwCv3sQTGFMlnbyDu1lF0S9Wv0VwEtkcNxFromJj0m9miX1i', 'Youth Steward', 'en', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO "UserOrganization" (id, "userId", "organizationId", role, "createdAt")
VALUES
  ('uo-001', 'user-finsec-001', 'org-church-001', 'FinanceSecretary', NOW()),
  ('uo-002', 'user-steward-001', 'org-church-001', 'Steward', NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO "Budget" (id, "organizationId", name, currency, "periodStart", "periodEnd", status, "createdAt", "updatedAt")
VALUES
  ('budget-2025-church-master', 'org-church-001', 'Church Master Budget 2025', 'CAD', '2025-01-01', '2025-12-31', 'ACTIVE', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO "BudgetCategory" (id, "budgetId", name, allocation, spent, "createdAt", "updatedAt")
VALUES
  ('cat-operations', 'budget-2025-church-master', 'Operations', 50000, 32000, NOW(), NOW()),
  ('cat-utilities', 'budget-2025-church-master', 'Utilities', 15000, 9000, NOW(), NOW()),
  ('cat-maintenance', 'budget-2025-church-master', 'Maintenance', 35000, 23000, NOW(), NOW()),
  ('cat-outreach', 'budget-2025-church-master', 'Outreach & Community', 25000, 21000, NOW(), NOW()),
  ('cat-youth', 'budget-2025-church-master', 'Youth Programs', 10000, 9000, NOW(), NOW()),
  ('cat-charity', 'budget-2025-church-master', 'Charity & Missions', 15000, 12000, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

UPDATE "BudgetCategory" SET "parentId" = 'cat-operations' WHERE id IN ('cat-utilities', 'cat-maintenance');
UPDATE "BudgetCategory" SET "parentId" = 'cat-outreach' WHERE id IN ('cat-youth', 'cat-charity');

INSERT INTO "Receipt" (id, "organizationId", "userId", vendor, amount, currency, status, source, "documentUrl", "receivedAt", "createdAt", "updatedAt")
VALUES
  ('receipt-001', 'org-church-001', 'user-steward-001', 'StationeryCo', 125.75, 'CAD', 'PENDING', 'upload', NULL, NOW() - INTERVAL '2 days', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
