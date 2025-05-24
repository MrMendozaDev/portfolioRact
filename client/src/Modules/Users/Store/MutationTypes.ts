type User = {
  id: number
  name: string
}

type State = {
  users: User[]
  loading: boolean
  error: string | null
}

export const initialState: State = {
  users: [],
  loading: false,
  error: '',
}