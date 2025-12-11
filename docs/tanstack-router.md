["뒤로"](../README.md)

# Routing 추가

Install tanstack router

```bash
pnpm add @tanstack/react-router
pnpm add -D @tanstack/router-plugin
```

Vite config setting `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
})
```

`main.tsx`

```tsx
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
```

`src/routes/__root.tsx`

```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return <Outlet />
}
```

Start dev

```bash
pnpm dev
```

Make file `src/routes/index.tsx` -> Auto generate route!
