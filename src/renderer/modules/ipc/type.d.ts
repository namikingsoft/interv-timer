export interface QuitAction {
  type: 'ipc/quit'
}

export interface SetVisibleOnAllWorkSpacesAction {
  type: 'ipc/setVisibleOnAllWorkspaces'
  payload: boolean
}

export interface UpdaterCheckForUpdatesAction {
  type: 'ipc/updaterCheckForUpdates'
}

export interface UpdaterQuitAndInstallAction {
  type: 'ipc/updaterQuitAndInstall'
}

export interface UpdaterDownloadedAction {
  type: 'ipc/updaterDownloaded'
  payload: { version: string }
}

export interface UpdaterAvailableAction {
  type: 'ipc/updaterAvailable'
  payload: { version: string }
}

export interface UpdaterProgressAction {
  type: 'ipc/updaterProgress'
  payload: { percent: number }
}

export interface UpdaterErrorAction {
  type: 'ipc/updaterError'
  payload: Error
}

export type RequestAction =
  | QuitAction
  | SetVisibleOnAllWorkSpacesAction
  | UpdaterCheckForUpdatesAction
  | UpdaterQuitAndInstallAction

export type RecieveAction =
  | UpdaterAvailableAction
  | UpdaterDownloadedAction
  | UpdaterProgressAction
  | UpdaterErrorAction

export type Action = RequestAction | RecieveAction
