import { Button } from '@/components/Button'
import { getAccessToken } from '@/utils/token'
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex items-center px-5 py-2 gap-1 border-b border-zinc-200">
        <p className="text-[16px] font-bold mr-4">TODO List</p>
        <Button variant="transparent" onClick={() => navigate({ to: '/' })}>
          홈
        </Button>
        <Button
          variant="transparent"
          onClick={() => {
            if (!getAccessToken()) {
              navigate({ to: '/login' })
            } else navigate({ to: '/my' })
          }}
        >
          내 할일
        </Button>
      </header>
      <Outlet />
    </div>
  )
}
