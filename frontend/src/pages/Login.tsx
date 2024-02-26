import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../components/Login/Input'
import Button from '../components/Login/Button'
import '../CSS/Login.css'

const Login = () => {
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [senha_conf, setSenhaConf] = useState('')
  const [showCadastro, setShowCadastro] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        senha,
      }),
    })
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      //console.log(`Token: ${data.token}`)
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.id)
      localStorage.setItem('expiresIn', data.expiresIn)
      localStorage.setItem('loginTime', Date.now().toString())  
      navigate('/userhome');
      alert('Login bem sucedido.')
    } else if (response.status === 404) {
      alert('Usuário não encontrado.')
      setShowCadastro(true)
    } else if (response.status === 401) {
      alert('Senha incorreta.')
    } else {
      alert('Ocorreu um erro ao fazer login.')
    }
  }

  const handleCadastro = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!nome || !senha || !senha_conf) {
      alert("Todos os campos devem ser preenchidos.")
      return
    }
    if(senha != senha_conf){
      alert("As senhas precisam ser iguais.")
      return
    }
    const response = await fetch('/api/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        senha,
      }),
    })
    if (response.ok) {
      alert('Cadastro bem sucedido.')
      window.location.reload();
    } else {
      alert('Ocorreu um erro ao cadastrar o usuário.')
    }
  }

  return (
    <div className="main">
      {showCadastro ? (
        <>
          <label className='formu' onClick={() => setShowCadastro(false)}>Login</label>
          <div className="signup form-container">
            <h2>Cadastro</h2>
            <form onSubmit={handleCadastro}>
              <Input label="Nome" type="text" placeholder="Insira o nome" onChange={setNome} />
              <Input label="Senha" type="password" placeholder="Insira a senha" onChange={setSenha} />
              <Input label="Confirmação de senha" type="password" placeholder="Confirme a senha" onChange={setSenhaConf} />
              <Button label="Cadastrar" />
            </form>
          </div>
        </>
      ) : (
        <>
          
          <div className="login form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <Input label="Nome" type="text" placeholder="Insira o nome" onChange={setNome} />
              <Input label="Senha" type="password" placeholder="Insira a senha" onChange={setSenha} />
              <Button label="Entrar"/>
            </form>
          </div>
          <label className='formu' onClick={() => setShowCadastro(true)}>Cadastro</label>
        </>
      )}
    </div>
  )  
}

export default Login
