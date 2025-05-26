
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './Store/Stores'
import { fetchUsers } from './Store/Actions'

const SetUsers = () => {
    const users = useSelector((state: RootState) => state.user.users)

    const dispatch = useDispatch<AppDispatch>();
    return (
    <div>
      {users.map((user, index) => (
        <h2 key={index}>Usuario: {user.name}</h2> // Ajusta según el campo que tenga el user
      ))}
      <button onClick={() => dispatch(fetchUsers())}>Cargar Usuarios</button>
    </div>
  )
}

export default SetUsers
