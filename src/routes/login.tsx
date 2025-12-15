import instance from '@/api'
import { setAccessToken } from '@/utils/token'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const onSubmit = () => {
    instance
      .post<{ accessToken: string }>('/auth/sign-in', {
        loginId: id,
        password,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken)
        navigate({ to: '/my' })
      })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <label>아이디</label>
      <input value={id} onChange={(e) => setId(e.target.value)} required />
      <label>비밀번호</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button>로그인</button>
    </form>
  )
}
