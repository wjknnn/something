import { Button } from '@/components/Button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center w-full h-full text-center">
      <section className="flex flex-col gap-10 justify-center max-w-[320px] w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-semibold">TODO List</h1>
          <p className="text-[16px] text-zinc-700">
            환영합니다! 나만의 할일을 작성해 보세요!
          </p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Button
            variant="outline"
            onClick={() => {
              navigate({ to: '/login' })
            }}
          >
            로그인
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              navigate({ to: '/signup' })
            }}
          >
            회원가입
          </Button>
        </div>
      </section>
    </div>
  )
}
