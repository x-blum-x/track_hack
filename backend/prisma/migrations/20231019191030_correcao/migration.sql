/*
  Warnings:

  - You are about to drop the column `tipo_pessoa` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `tipoPessoa` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "tipoPessoa" TEXT NOT NULL,
    "foto" TEXT
);
INSERT INTO "new_usuarios" ("cpf", "email", "foto", "id", "nome", "senha", "sexo") SELECT "cpf", "email", "foto", "id", "nome", "senha", "sexo" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
