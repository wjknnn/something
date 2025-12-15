import instance from '@/api'
import { useEffect, useState } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAccessToken } from '@/utils/token'

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

export const Route = createFileRoute('/my')({
  beforeLoad: () => {
    if (!getAccessToken()) throw redirect({ to: '/' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const [inputValue, setInputValue] = useState<string>('')
  const [list, setList] = useState<List[]>([])

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
  }, [])

  return (
    <div className="p-4">
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border"
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
      <ol className="flex w-full flex-col">
        {list.map((v, i) => (
          <li key={i} className="flex w-full justify-between">
            <button onClick={() => toggleStatus(v)}>
              {v.isComplete ? '(O)' : '( )'}
            </button>
            <p>{v.name}</p>
            <p>{v.isComplete ? '완료됨' : '미완료'}</p>
            <button onClick={() => onDelete(v.id)}>X</button>
          </li>
        ))}
      </ol>
    </div>
  )
}
