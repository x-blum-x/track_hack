import * as usuarioService from './usuario'
import bcrypt from 'bcrypt'
import { Response } from 'express'
import jwt from 'jsonwebtoken'

export async function login(nome: string, senha: string, res: Response) {
  const usuario = await usuarioService.obterUsuarioPorNome(nome)
  if (!usuario) {
    throw { status: 404, message: 'Usuário não encontrado' };
  }
  const senhaValida = await bcrypt.compare(senha, usuario.senha)
  if (!senhaValida) {
    throw { status: 401, message: 'Senha inválida' };
  }

  const token = jwt.sign({ id: usuario.id }, '2nRg9GKfiuYSGDa$iubiyV56Yebc', { expiresIn: '15m' });
  res.cookie('token', token, { httpOnly: true })
    const decodedToken: any = jwt.decode(token);
  const expirationTimeInSeconds = decodedToken.exp - Math.floor(Date.now() / 1000);
  
  return { usuario, token, expirationTimeInSeconds };
}