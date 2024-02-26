import { PrismaClient } from '@prisma/client'
import { Usuario } from '../models/usuario'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function criarUsuario(usuario: Usuario) {
  const idAleatorio = Math.floor(Math.random() * 10000000) // geração id aleatório ate 7 digitos
  const senhaEncriptada = await bcrypt.hash(usuario.senha, 10) // encripitação da senha
  const usuarioExistente = await prisma.usuarios.findUnique({
    where: { id: idAleatorio },
  })

  if (usuarioExistente) {
    throw new Error('ID de usuário já existe. Por favor, tente novamente.')// trocar a conferencia de ID por nome
  }

  return await prisma.usuarios.create({
    data: {
      ...usuario,
      id: idAleatorio,
      senha: senhaEncriptada,
    },
  })
}
export async function obterUsuarioPorId(id: number) {
  //console.log('ID passado:', id)
  return await prisma.usuarios.findUnique({
    where: { id },
  })
}
export async function obterUsuarioPorNome(nome: string) {
  return await prisma.usuarios.findFirst({
    where: { nome },
  })
}
export async function atualizarUsuario(id: number, usuario: Partial<Usuario>) {
  const { ...rest } = usuario;
  const data: any = { ...rest };

  return await prisma.usuarios.update({
    where: { id },
    data,
  })
}
export async function deletarUsuario(id: number) {
  return await prisma.usuarios.delete({
    where: { id },
  })
}
