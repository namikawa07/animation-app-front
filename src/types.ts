import { VISIBILITY_FILTERS } from './constants'

// ここ使わない
type TypeScript = {
  // モバイルか？
  isMobileSite: boolean
  // タブレットか？
  isTabletSite: boolean
  // PCか？
  isPcSite: boolean

  helloObj: {
    id?: number
    title: string
    text: string
  }
}

// ここから使う
export type VisibilityFilterTypes =
  (typeof VISIBILITY_FILTERS)[keyof typeof VISIBILITY_FILTERS]

export interface RootState {
  visibilityFilter: VisibilityFilterTypes
  todos: TodoState
}

export interface TodoState {
  todoItems: Array<TodoItem>
  loading: boolean
  error: {
    status: boolean
    message: string | null
  }
}

export interface TodoItem {
  id: number
  content: string
  completed: boolean
}

// ----------------------------ちゃんと使ってるのかここから

export interface ButtonListItemType {
  serviceTitle: string
  dialogType: string
  LoginServiceHandler: (serviceType: string) => void
}

export interface SignInSwitchesType {
  checked: boolean
  switchHandler: (isSwitch: boolean) => void
}

export interface ProfileStateType {
  profile: ProfileType
  loading: boolean
  error: {
    status: boolean
    message: string | null
  }
}

export interface ProfileType {
  uuid: string
  status: string
  name: string
  self_introduction: string
  thumbnail_url: string
  email: string
}

export interface FirebaseAuthPasswordWithEmailType {
  access_token: string | null
  refresh_token: string
  tenant_id: string | null
}

export interface AccountBackgroundComponentType {
  thumbnailUrl: string
}

export interface UserIconComponentType {
  clickIconHandler: () => void | null
  size: number
  thumbnailUrl: string
}

export interface AccountDescriptionComponentType {
  description: string
}

export default TypeScript
