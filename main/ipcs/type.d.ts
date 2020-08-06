import { Action } from '../../renderer/modules/ipc/type'

interface Receiver {
  on: (callback: (action: Action) => void) => void
}

interface Sender {
  send: (action: Action) => void
}

export type Initializer<DI = void> = (
  di: DI,
) => (receiver: Receiver, sender: Sender) => void
