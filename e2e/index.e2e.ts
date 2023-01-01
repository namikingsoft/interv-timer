import path from 'path'
import { _electron as electron } from 'playwright'
import { ElectronApplication, Page, test, expect } from '@playwright/test'
import packageJson from '../package.json'

const { productName } = packageJson.build

const captureScreenshot = async (window: Page, identifier: string) => {
  const filepath = path.resolve(
    __dirname,
    '..',
    '.work',
    'screenshot',
    `${identifier}.png`,
  )
  return window.screenshot({ path: filepath })
}

let electronApp: ElectronApplication

test.beforeEach(async () => {
  electronApp = await electron.launch({
    executablePath:
      process.platform === 'darwin'
        ? `release/mac/${productName}.app/Contents/MacOS/${productName}`
        : `release/win-unpacked/${productName}.exe`,
  })
  await electronApp.evaluate(async (electron) => {
    return electron.session.defaultSession.clearStorageData()
  })
})

test.afterEach(async () => {
  await electronApp.close()
})

test('save settings', async () => {
  const window = await electronApp.firstWindow()
  const settingIcon = window.getByTestId('SettingIcon')
  await settingIcon.click()
  const textarea = window.getByTestId('AgendaListTextarea')
  expect(await textarea.inputValue()).toBe('Agenda1,60\nAgenda2,180')
  await captureScreenshot(window, 'setting-default')
  await textarea.fill('Test1,90\nTest2,120')
  await captureScreenshot(window, 'setting-edited')
  const saveIcon = window.getByTestId('SaveIcon')
  await saveIcon.click()
  const agendaLabel0 = window.getByTestId('AgendaTimer0Label')
  const agendaLabel1 = window.getByTestId('AgendaTimer1Label')
  const agendaTime0 = window.getByTestId('AgendaTimer0Value')
  const agendaTime1 = window.getByTestId('AgendaTimer1Value')
  const totalTime = window.getByTestId('TotalTimerValue')
  const idealTime = window.getByTestId('IdealTimerValue')
  expect(await agendaLabel0.innerText()).toBe('Test1')
  expect(await agendaLabel1.innerText()).toBe('Test2')
  expect(await agendaTime0.innerText()).toBe('00:01:30')
  expect(await agendaTime1.innerText()).toBe('00:02:00')
  expect(await totalTime.innerText()).toBe('00:03:30')
  expect(await idealTime.innerText()).toBe('00:01:30')
  await captureScreenshot(window, 'home-edited')
})

test('set default agenda list on first run', async () => {
  const window = await electronApp.firstWindow()
  // for stable test start, TODO: avoid code
  // https://github.com/namikingsoft/interv-timer/runs/4276333010?check_suite_focus=true
  const playIcon = window.getByTestId('PlayIcon')
  const pauseIcon = window.getByTestId('PauseIcon')
  await playIcon.click()
  await pauseIcon.waitFor({ state: 'visible' })
  await pauseIcon.click()
  // for stable test end
  const agendaLabel0 = window.getByTestId('AgendaTimer0Label')
  const agendaLabel1 = window.getByTestId('AgendaTimer1Label')
  const agendaTime0 = window.getByTestId('AgendaTimer0Value')
  const agendaTime1 = window.getByTestId('AgendaTimer1Value')
  const totalTime = window.getByTestId('TotalTimerValue')
  const idealTime = window.getByTestId('IdealTimerValue')
  expect(await agendaLabel0.innerText()).toBe('Agenda1')
  expect(await agendaLabel1.innerText()).toBe('Agenda2')
  expect(await agendaTime0.innerText()).toBe('00:01:00')
  expect(await agendaTime1.innerText()).toBe('00:03:00')
  expect(await totalTime.innerText()).toBe('00:04:00')
  expect(await idealTime.innerText()).toBe('00:01:00')
  await captureScreenshot(window, 'home-default')
})

test('behave agenda timer', async () => {
  const window = await electronApp.firstWindow()
  const agendaTime0 = window.getByTestId('AgendaTimer0Value')
  const agendaTime1 = window.getByTestId('AgendaTimer1Value')
  const totalTime = window.getByTestId('TotalTimerValue')
  const idealTime = window.getByTestId('IdealTimerValue')
  const playIcon = window.getByTestId('PlayIcon')
  const pauseIcon = window.getByTestId('PauseIcon')
  expect(await pauseIcon.isVisible()).toBe(false)
  await playIcon.click()
  await pauseIcon.waitFor({ state: 'visible' })
  await captureScreenshot(window, 'circle-played')
  await expect
    .poll(() => agendaTime0.innerText(), {
      intervals: [...Array(20)].map((_, i) => i * 100),
    })
    .toBe('00:00:59')
  await pauseIcon.click()
  await playIcon.waitFor({ state: 'visible' })
  await captureScreenshot(window, 'home-paused')
  expect(await agendaTime1.innerText()).toBe('00:03:00')
  expect(await totalTime.innerText()).toBe('00:03:59')
  expect(await idealTime.innerText()).toBe('00:00:59')
  await playIcon.click()
  const lapIcon = window.getByTestId('LapIcon')
  await lapIcon.click()
  await expect
    .poll(() => agendaTime1.innerText(), {
      intervals: [...Array(20)].map((_, i) => i * 100),
    })
    .toBe('00:02:59')
  await pauseIcon.click()
  expect(await agendaTime0.isVisible()).toBe(false)
  expect(await totalTime.innerText()).toBe('00:03:58')
  expect(await idealTime.innerText()).toBe('00:03:58')
  await captureScreenshot(window, 'home-lapped')
  await playIcon.click()
  await pauseIcon.waitFor({ state: 'visible' })
  expect(await playIcon.isVisible()).toBe(false)
  await lapIcon.click()
  await playIcon.waitFor({ state: 'visible' })
  await agendaTime0.waitFor({ state: 'visible' })
  expect(await agendaTime0.innerText()).toBe('00:00:59')
  await captureScreenshot(window, 'home-finished')
})

test('behave agenda timer using circle skin', async () => {
  const window = await electronApp.firstWindow()
  const settingIcon = window.getByTestId('SettingIcon')
  await settingIcon.click()
  const circleSwitch = window.getByTestId('SkinModeCircleSwitch')
  await circleSwitch.click()
  await window.waitForTimeout(500) // wait animation
  await captureScreenshot(window, 'circle-settings')
  const saveIcon = window.getByTestId('SaveIcon')
  await saveIcon.click()
  const agendaLabel = window.getByTestId('AgendaTimerLabel')
  const agendaTime = window.getByTestId('AgendaTimerValue')
  const totalTime = window.getByTestId('TotalTimerValue')
  const idealTime = window.getByTestId('IdealTimerValue')
  expect(await agendaLabel.innerText()).toBe('Agenda1')
  expect(await agendaTime.innerText()).toBe('00:01:00')
  expect(await totalTime.innerText()).toBe('00:04:00')
  expect(await idealTime.innerText()).toBe('00:01:00')
  await captureScreenshot(window, 'circle-home')
  const playIcon = window.getByTestId('PlayIcon')
  await playIcon.click()
  await captureScreenshot(window, 'circle-played')
  await expect
    .poll(() => agendaTime.innerText(), {
      intervals: [...Array(20)].map((_, i) => i * 100),
    })
    .toBe('00:00:59')
  const pauseIcon = window.getByTestId('PauseIcon')
  await pauseIcon.click()
  await captureScreenshot(window, 'circle-paused')
  await playIcon.waitFor({ state: 'visible' })
  expect(await totalTime.innerText()).toBe('00:03:59')
  expect(await idealTime.innerText()).toBe('00:00:59')
  await playIcon.click()
  const lapIcon = window.getByTestId('LapIcon')
  await lapIcon.click()
  await expect
    .poll(() => agendaTime.innerText(), {
      intervals: [...Array(20)].map((_, i) => i * 100),
    })
    .toBe('00:02:59')
  expect(await totalTime.innerText()).toBe('00:03:58')
  expect(await idealTime.innerText()).toBe('00:03:58')
  await captureScreenshot(window, 'circle-lapped')
  await lapIcon.click()
  await playIcon.waitFor({ state: 'visible' })
  const finishedIcon = window.getByTestId('FinishedIcon')
  await finishedIcon.waitFor({ state: 'visible' })
  await captureScreenshot(window, 'circle-finished')
  expect(await agendaTime.isVisible()).toBe(false)
})
