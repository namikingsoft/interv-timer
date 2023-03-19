export interface QuitAction {
  type: 'ipc/quit'
}

export interface SetVisibleOnAllWorkSpacesAction {
  type: 'ipc/setVisibleOnAllWorkspaces'
  payload: boolean
}

export interface DragWindowAction {
  type: 'ipc/dragWindow'
  payload: {
    startX: number
    startY: number
  }
}

export interface ShortcutToggleAction {
  type: 'ipc/shortcutToggle'
}

export interface ShortcutLapAction {
  type: 'ipc/shortcutLap'
}

export interface ShortcutUndoAction {
  type: 'ipc/shortcutUndo'
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
  | DragWindowAction
  | ShortcutToggleAction
  | ShortcutLapAction
  | ShortcutUndoAction
  | UpdaterCheckForUpdatesAction
  | UpdaterQuitAndInstallAction

export type RecieveAction =
  | UpdaterAvailableAction
  | UpdaterDownloadedAction
  | UpdaterProgressAction
  | UpdaterErrorAction

export type Action = RequestAction | RecieveAction
