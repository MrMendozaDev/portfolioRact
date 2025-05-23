
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './Store/Stores'
import { increment, decrement } from './Store/Actions'

const SetUsers = () => {
    const user = useSelector((state: RootState) => state.user.value)
    const dispatch = useDispatch();
    return (
        <div>
            <h2>Count: {user}</h2>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    )
}

export default SetUsers
