import instance from '@/api'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
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
      .catch(() => alert('로그인에 실패했습니다.'))
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
        <h1 className="text-[28px] font-semibold text-center mb-2">로그인</h1>
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
        <Button className="mt-5">로그인</Button>
      </form>
    </div>
  )
}
