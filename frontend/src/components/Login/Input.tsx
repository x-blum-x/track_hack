import React from 'react'

interface InputProps {
  label: string
  type: string
  placeholder: string
  onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({ label, type, placeholder, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
    </div>
  )
}

export default Input
