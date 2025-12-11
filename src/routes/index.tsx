import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex justify-center w-full text-center">
      <section className="flex flex-col gap-10 justify-center max-w-[320px] w-full">
        <h1 className="text-[40px] font-semibold">TODO List</h1>
        <div className="flex flex-col w-full gap-2">
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </section>
    </div>
  )
}
