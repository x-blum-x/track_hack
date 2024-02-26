/*
  Warnings:

  - You are about to drop the `lixo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cpf` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `tipoPessoa` on the `usuarios` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "lixo";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" TEXT
);
INSERT INTO "new_usuarios" ("foto", "id", "nome", "senha") SELECT "foto", "id", "nome", "senha" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
