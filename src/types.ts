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

export type VisibilityFilterTypes =
  (typeof VISIBILITY_FILTERS)[keyof typeof VISIBILITY_FILTERS]

export interface RootState {
  visibilityFilter: VisibilityFilterTypes
  todos: TodoState
}

export interface TodoState {
  todoItems: any
  loading: boolean
  error: {
    status: boolean
    message: string | null
  }
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

// ------------------- PostData ------------------
export interface PostDataType {
  id: number
  uuid: string | null
  title: string | null
  contents_type: string | null
  description: string | null
  status: string | null
  user: UserDataType | null
  video: VideoDataType | null
}

export interface PostInitialStateType {
  post: PostDataType
  loading: boolean
  error: ErrorType
}

// ------------------- PostData ------------------

// ------------------- UserData ------------------

export interface UserDataType {
  id: number
}
// ------------------- UserData ------------------

// ------------------- VideoData ------------------
export interface VideoDataType {
  id: number
  post: PostDataType
  status: string
  url: string
  uuid: string
}

// ------------------- VideoData ------------------

// ------------------ error type --------------------
export interface ErrorType {
  status: any | null
  message: any | null
}

// ------------------- useParams ------------------
export interface UseParamsType {
  uuid: string 
}
// ------------------- useParams ------------------

export default TypeScript
