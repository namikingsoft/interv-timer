export interface State {
  newVersion: string
  downloaded: boolean
  percent: number
}

export interface AvailableAction {
  type: 'updater/available'
  payload: { newVersion: string }
}

export interface ProgressAction {
  type: 'updater/progress'
  payload: { percent: number }
}

export interface DownloadedAction {
  type: 'updater/downloaded'
}

export type Action = AvailableAction | ProgressAction | DownloadedAction
