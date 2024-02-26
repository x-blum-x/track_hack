import express from 'express';
import path from 'path';
import cors from 'cors';
import usuarioRoutes from './routes/usuario'

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(usuarioRoutes)
// Sirva os arquivos estáticos do Vite/React
const staticPath = path.join(__dirname, '..', '..', 'frontend', 'dist');
app.use(express.static(staticPath));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
