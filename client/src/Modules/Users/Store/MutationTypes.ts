type User = {
  id: number
  name: string
}

type Menus = {
  icon: number
  label: string
  path: string
}

type State = {
  users: User[]
  menus: Menus[]
  loading: boolean
  error: string | null
}

export const initialState: State = {
  users: [],
  menus: [],
  loading: false,
  error: '',
}