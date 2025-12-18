import instance from '@/api'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const onSubmit = () => {
    instance
      .post('/auth/sign-up', {
        nickname: name,
        email: email,
        loginId: id,
        password: password,
      })
      .then(() => {
        navigate({ to: '/login' })
      })
      .catch(() => alert('회원가입에 실패했습니다.'))
  }

  return (
    <div className="flex w-full h-full justify-center items-center px-5">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="flex flex-col gap-3 max-w-[320px] w-full"
      >
        <h1 className="text-[28px] font-semibold text-center mb-2">회원가입</h1>
        <Input
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className="mt-5">회원가입 하기</Button>
      </form>
    </div>
  )
}
