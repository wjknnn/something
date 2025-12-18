import instance from '@/api'
import { useEffect, useState } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAccessToken } from '@/utils/token'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

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

export const Route = createFileRoute('/my')({
  beforeLoad: () => {
    if (!getAccessToken()) throw redirect({ to: '/' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const [inputValue, setInputValue] = useState<string>('')
  const [list, setList] = useState<List[]>([])
  const [myCode, setMyCode] = useState<string>('')

  const getMyCode = () => {
    instance.get<User>('/user').then((res) => setMyCode(res.data.code))
  }

  const getList = () => {
    instance.get<ListRes[]>('/todo/list').then((res) => {
      const data = res.data.map((v) => ({
        id: v.id,
        name: v.title,
        isComplete: v.isComplete,
      }))
      setList(data)
    })
  }

  const onSubmit = () => {
    instance.post('/todo', { title: inputValue }).then(() => getList())
    setInputValue('')
  }

  const toggleStatus = (v: List) => {
    instance
      .put(`/todo/${v.id}`, { title: v.name, isComplete: !v.isComplete })
      .then(() => getList())
  }

  const onDelete = (id: number) => {
    instance.delete(`/todo/${id}`).then(() => getList())
  }

  useEffect(() => {
    getList()
    getMyCode()
  }, [])

  return (
    <div className="flex justify-center px-5 py-10">
      <div className="flex flex-col max-w-[400px] w-full gap-10">
        <Button
          variant="secondary"
          onClick={() => {
            navigator.clipboard.writeText(`${location.origin}/list/${myCode}`)
          }}
        >
          내 Todo List 공유하기
        </Button>
        <div className="flex flex-col gap-2">
          <Input
            label="할 일 입력"
            type="text"
            placeholder="할 일을 입력해 주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border"
          />
          <Button onClick={onSubmit}>할 일 등록하기</Button>
        </div>
        <ol className="flex w-full flex-col gap-2">
          {list.map((v, i) => (
            <li
              key={i}
              className="flex w-full gap-4 items-center bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-200"
            >
              <button
                onClick={() => toggleStatus(v)}
                className={`size-5 border-2 rounded-md flex justify-center items-center cursor-pointer transition-colors ${
                  v.isComplete
                    ? 'bg-green-500 text-white border-green-500'
                    : 'hover:border-green-500'
                }`}
              >
                {v.isComplete ? '✓' : ''}
              </button>
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-[20px] font-medium">{v.name}</p>
                <p
                  className={v.isComplete ? 'text-green-500' : 'text-zinc-600'}
                >
                  {v.isComplete ? '완료됨' : '미완료'}
                </p>
              </div>
              <button
                onClick={() => onDelete(v.id)}
                className="hover:text-red-500 cursor-pointer transition-colors"
              >
                X
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
