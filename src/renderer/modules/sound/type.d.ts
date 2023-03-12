export interface PlayHurryAction {
  type: 'sound/playHurry'
}

export interface PlayTimeupAction {
  type: 'sound/playTimeup'
}

export type Action = PlayHurryAction | PlayTimeupAction
