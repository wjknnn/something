import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './index.css'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
