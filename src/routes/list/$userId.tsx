import instance from '@/api'
import { getAccessToken } from '@/utils/token'
import { createFileRoute, redirect, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/list/$userId')({
  beforeLoad: () => {
    if (!getAccessToken()) throw redirect({ to: '/login' })
  },
  component: RouteComponent,
})

type List = {
  id: number
  name: string
  isComplete: boolean
}

type ListRes = {
  id: number
  title: string
  isComplete: boolean
  userId: number
}

type User = { id: number; nickname: string; code: string }

function RouteComponent() {
  const { userId } = useParams({ from: '/list/$userId' })

  const [list, setList] = useState<List[]>([])
  const [username, setUsername] = useState<string>('')

  const getUsername = () => {
    instance
      .get<User>(`/user/${userId}`)
      .then((res) => setUsername(res.data.nickname))
  }

  const getList = () => {
    instance.get<ListRes[]>(`/todo/list/${userId}`).then((res) => {
      const newList = res.data.map((v) => ({
        id: v.id,
        name: v.title,
        isComplete: v.isComplete,
      }))
      setList(newList)
    })
  }

  useEffect(() => {
    getList()
    getUsername()
  }, [])

  return (
    <div className="flex justify-center px-5 py-10">
      <div className="flex flex-col max-w-[400px] w-full gap-10">
        <p className="text-[32px] font-semibold">{username}님의 Todo List</p>
        <ol className="flex w-full flex-col gap-2">
          {list.map((v, i) => (
            <li
              key={i}
              className="flex w-full gap-4 items-center bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-200"
            >
              <div
                className={`size-5 border-2 rounded-md flex justify-center items-center transition-colors ${
                  v.isComplete ? 'bg-green-500 text-white border-green-500' : ''
                }`}
              >
                {v.isComplete ? '✓' : ''}
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-[20px] font-medium">{v.name}</p>
                <p
                  className={v.isComplete ? 'text-green-500' : 'text-zinc-600'}
                >
                  {v.isComplete ? '완료됨' : '미완료'}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
