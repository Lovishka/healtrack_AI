import { useState } from 'react'

export default function Tabs({ items = [], defaultValue }) {
  const [active, setActive] = useState(defaultValue || (items[0] && items[0].id))

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setActive(it.id)}
            className={`px-3 py-2 rounded-md text-sm ${
              active === it.id ? 'bg-white shadow' : 'bg-transparent text-gray-600'
            }`}
          >
            {it.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow-sm min-h-[120px]">
        {items.map((it) => (active === it.id ? <div key={it.id}>{it.content}</div> : null))}
      </div>
    </div>
  )
}
