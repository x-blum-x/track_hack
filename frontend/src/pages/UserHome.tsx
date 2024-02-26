import React, { useEffect, useState, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import '../CSS/UserHome.css'
const Home = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('')
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [expiresIn, setExpiresIn] = useState(() => {
    const loginTime = Number(localStorage.getItem('loginTime'))
    const expiresIn = Number(localStorage.getItem('expiresIn'))
    const currentTime = Date.now()
    const timeElapsed = Math.floor((currentTime - loginTime) / 1000) // Tempo decorrido em segundos
    return expiresIn - timeElapsed
  })

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpiresIn(prevState => prevState - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (expiresIn <= 0) {
      navigate('/');
    }
    fetch('/api/userinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId')
      })
    })
    .then(response => response.json())
    .then(data => {
      setNome(data.nome);
      setImageUrl(data.foto);
    })
    .catch(error => console.error('Fetch Error: ', error));
  }, [expiresIn, history])

  const convertTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds}`;
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const fileType = file.type;
        if (fileType !== 'image/jpeg' && fileType !== 'image/png' && fileType !== 'image/jpg') {
            console.error("Tipo de arquivo não permitido!");
            return;
        }
        const reader = new FileReader()
        reader.onloadend = async () => {
            setImage(reader.result as string)
            // Enviar a imagem para o servidor
            const formData = new FormData();
            formData.append('image', file);
            const userId = localStorage.getItem('userId');
            const response = await fetch(`/api/user/profile-image?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            })
            if (response.ok) {
                const data = await response.json()
                setImageUrl(data.imageUrl)
                console.log('Imagem carregada com sucesso:', data.imageUrl)
            } else {
                console.error('Erro ao carregar a imagem:', response.statusText)
            }
        }
        reader.readAsDataURL(file)
    }
}
  return (
    <div className='main_home'>
      <div id='user_container'>
        <div id='user_image'>
          {image && <img src={image} alt="Imagem carregada" style={{ width: '100%', height: '100%' }} />}
          {imageUrl && <img src={imageUrl} alt="Imagem salva" style={{ width: '100%', height: '100%' }} />}
        </div>
        <input type="file" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
        <button onClick={() => fileInputRef.current?.click()}>Upload</button>
        <h1>{nome}</h1>
        <h2>{convertTime(expiresIn)}</h2>
      </div>
    </div>
  )
}
export default Home