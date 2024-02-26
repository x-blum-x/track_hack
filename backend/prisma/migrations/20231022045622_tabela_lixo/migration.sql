-- CreateTable
CREATE TABLE "lixo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "peso" REAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "lixo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
