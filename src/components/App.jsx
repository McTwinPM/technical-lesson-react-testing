import { useState, useEffect } from 'react'
import UserList from './UserList'


function App() {
  const [users, setUsers] = useState([])

  return (
    <div>
      <UserList users={users}/>
    </div>
  )
}

export default App
