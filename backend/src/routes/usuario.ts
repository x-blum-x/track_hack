import express from 'express'
import multer from 'multer'
import * as usuarioService from '../services/usuario'
import * as authService from '../services/authService'
import { authMiddleware } from '../middlewares/authMiddleware'
import cloudinary from 'cloudinary';
import { Prisma, PrismaClient } from '@prisma/client';

const router = express.Router()
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 1024 * 1024 * 5 // limite de 5MB
  }
})
export const prisma = new PrismaClient();
router.post('/api/cadastro', async (req, res) => {
  try {
    const usuario = await usuarioService.criarUsuario(req.body)
    //console.log(`Usuário criado com sucesso! ID: ${usuario.id}, Nome: ${usuario.nome}`) 
    res.redirect(302, '/');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Erro ao criar usuário: ${error.message}`);
      res.status(500).json({ error: error.message })
    }
  }
})

router.post('/api/login', async (req, res) => {
  try {
    const { nome, senha } = req.body
    const usuario = await authService.login(nome, senha, res);
    //console.log('Tempo do token: ', usuario.expirationTimeInSeconds)
    res.json({ token: usuario.token, nome: usuario.usuario.nome, id: usuario.usuario.id, expiresIn: usuario.expirationTimeInSeconds })
  } catch (error: any) {
    res.status(error.status).json({ error: error.message })
  }
})

let isRequestBeingProcessed = false;

router.post('/api/userinfo', authMiddleware, async (req, res) => {
  if (isRequestBeingProcessed) {
    return;
  }
  isRequestBeingProcessed = true;
  const id = Number(req.body.userId);
  if (!id) {
    isRequestBeingProcessed = false;
    return res.status(400).json({ error: 'ID de usuário não fornecido' });
  }
  const usuario = await usuarioService.obterUsuarioPorId(id)
  //console.log('Usuário logado:',usuario?.nome)
  
  res.json(usuario)
  isRequestBeingProcessed = false;
})
router.post('/api/user/profile-image', authMiddleware, upload.single('image'), async (req, res) => {
  try {
      const userId = req.user.id; // Adicione esta linha
      console.log(userId)
      if (!userId) {
          return res.status(400).json({ error: 'ID de usuário não fornecido.' });
      }
      if (!req.file) {
          return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
      }
      console.log('Arquivo: ', req.file)
      const fileStr = req.file.path;
      // Configure o Cloudinary
      cloudinary.v2.config({ 
          cloud_name: 'dqznzs9hk', 
          api_key: '274497498297865', 
          api_secret: 'xrijUuDj4jfWBZi_xkFmXyQG_PQ' 
      });

      // Fazer upload da nova imagem
      const result = await cloudinary.v2.uploader.upload(fileStr, {
          public_id: `home/Track Hack/profile_${userId}`,
          resource_type: 'image'
      });

      if (!result) {
          throw new Error('Falha ao processar o resultado do Cloudinary.');
      }

      // Salvar a nova URL da imagem no banco de dados
      const updatedUser = await prisma.usuarios.update({
          where: { id: userId },
          data: {
              foto: result.url
          }
      });

      console.log(`Imagem de perfil carregada com sucesso para o usuário: ${userId}`);
      res.status(200).json({ message: "Imagem de perfil atualizada com sucesso!", imageUrl: result.url });

  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Algo deu errado' });
  }
});
export default router