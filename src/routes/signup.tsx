import instance from '@/api'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit = () => {
    instance.post('/auth/sign-up', {
      nickname: name,
      email: email,
      loginId: id,
      password: password,
    })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="flex flex-col px-4 gap-2"
    >
      <label>이름</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />
      <label>이메일</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>아이디</label>
      <input
        type="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <label>비밀번호</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button>회원가입 하기</button>
    </form>
  )
}
