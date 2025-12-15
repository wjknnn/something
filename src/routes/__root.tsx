import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full">
      <header>
        <button onClick={() => navigate({ to: '/' })}>홈</button>
      </header>
      <Outlet />
    </div>
  )
}
