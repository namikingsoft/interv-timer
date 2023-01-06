import { GlobalShortcut } from 'electron'
import { Initializer } from './type'

interface DependencyInjection {
  globalShortcut: GlobalShortcut
}

// NOTE: disable global shortcut temporarily for prevent conflict with other apps e.g. vscode Command+P
// TODO: scrutinize key maps or implement key config
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const initialize: Initializer<DependencyInjection> = () => () => {}
// ({ globalShortcut }) =>
// (_, sender) => {
//   globalShortcut.registerAll(
//     ['CommandOrControl+P', 'CommandOrControl+Return'],
//     () => {
//       sender.send({ type: 'ipc/shortcutToggle' })
//     },
//   )
//   globalShortcut.registerAll(
//     ['CommandOrControl+J', 'CommandOrControl+Down', 'CommandOrControl+Right'],
//     () => {
//       sender.send({ type: 'ipc/shortcutLap' })
//     },
//   )
//   globalShortcut.registerAll(
//     ['CommandOrControl+K', 'CommandOrControl+Up', 'CommandOrControl+Left'],
//     () => {
//       sender.send({ type: 'ipc/shortcutUndo' })
//     },
//   )
// }
