import { useState } from 'react'

type List = {
  name: string
  isComplete: boolean
}

export default function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [list, setList] = useState<List[]>([])

  const onSubmit = () => {
    setList((prev) => [
      ...prev,
      {
        name: inputValue,
        isComplete: false,
      },
    ])
    setInputValue('')
  }

  const toggleStatus = (i: number) => {
    setList((prev) => {
      const tmp = [...prev]
      tmp[i].isComplete = !tmp[i].isComplete
      return tmp
    })
  }

  const onDelete = (i: number) => {
    setList((prev) => {
      const deletedList = prev.filter((_, index) => index !== i)
      return deletedList
    })
  }

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
            <button onClick={() => toggleStatus(i)}>
              {v.isComplete ? '(O)' : '( )'}
            </button>
            <p>{v.name}</p>
            <p>{v.isComplete ? '완료됨' : '미완료'}</p>
            <button onClick={() => onDelete(i)}>X</button>
          </li>
        ))}
      </ol>
    </div>
  )
}
