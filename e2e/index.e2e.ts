import { Application } from 'spectron'
import fs from 'fs'
import util from 'util'
import path from 'path'
import packageJson from '../package.json'

const { productName } = packageJson.build

describe('End-To-Ends', () => {
  let app: Application

  const getByTestId = (testId: string) =>
    app.client.$(`[data-testid="${testId}"]`)

  const captureScreenshot = async (identifier: string) => {
    const filepath = path.resolve(
      __dirname,
      '..',
      '.work',
      'screenshot',
      `${identifier}.png`,
    )
    const imageBuffer = await app.browserWindow.capturePage()
    return util.promisify(fs.writeFile)(filepath, imageBuffer as never)
  }

  beforeEach(async () => {
    app = new Application({
      path: path.join(
        __dirname,
        '..',
        process.platform === 'darwin'
          ? `dist/mac/${productName}.app/Contents/MacOS/${productName}`
          : `dist/win-unpacked/${productName}.exe`,
      ),
    })
    await app.start()
    await app.browserWindow.isVisible()
  })

  afterEach(async () => {
    if (app && app.isRunning()) {
      await app.stop()
    }
  })

  it('should save settings', async () => {
    const settingIcon = await getByTestId('SettingIcon')
    await settingIcon.click()
    const textarea = await getByTestId('AgendaListTextarea')
    expect(await textarea.getValue()).toBe('Agenda1,60\nAgenda2,180')
    await captureScreenshot('setting-default')
    await textarea.setValue('Test1,90\nTest2,120')
    await captureScreenshot('setting-edited')
    const saveIcon = await getByTestId('SaveIcon')
    await saveIcon.click()
    const agendaLabel0 = await getByTestId('AgendaTimer0Label')
    const agendaLabel1 = await getByTestId('AgendaTimer1Label')
    const agendaTime0 = await getByTestId('AgendaTimer0Value')
    const agendaTime1 = await getByTestId('AgendaTimer1Value')
    const totalTime = await getByTestId('TotalTimerValue')
    const idealTime = await getByTestId('IdealTimerValue')
    expect(await agendaLabel0.getText()).toBe('Test1')
    expect(await agendaLabel1.getText()).toBe('Test2')
    expect(await agendaTime0.getText()).toBe('00:01:30')
    expect(await agendaTime1.getText()).toBe('00:02:00')
    expect(await totalTime.getText()).toBe('00:03:30')
    expect(await idealTime.getText()).toBe('00:01:30')
    await captureScreenshot('home-edited')
  })

  it('should set default agenda list on first run', async () => {
    const agendaLabel0 = await getByTestId('AgendaTimer0Label')
    const agendaLabel1 = await getByTestId('AgendaTimer1Label')
    const agendaTime0 = await getByTestId('AgendaTimer0Value')
    const agendaTime1 = await getByTestId('AgendaTimer1Value')
    const totalTime = await getByTestId('TotalTimerValue')
    const idealTime = await getByTestId('IdealTimerValue')
    expect(await agendaLabel0.getText()).toBe('Agenda1')
    expect(await agendaLabel1.getText()).toBe('Agenda2')
    expect(await agendaTime0.getText()).toBe('00:01:00')
    expect(await agendaTime1.getText()).toBe('00:03:00')
    expect(await totalTime.getText()).toBe('00:04:00')
    expect(await idealTime.getText()).toBe('00:01:00')
    await captureScreenshot('home-defailt')
  })

  it('should behave agenda timer', async () => {
    const agendaTime0 = await getByTestId('AgendaTimer0Value')
    const agendaTime1 = await getByTestId('AgendaTimer1Value')
    const totalTime = await getByTestId('TotalTimerValue')
    const idealTime = await getByTestId('IdealTimerValue')
    const playIcon = await getByTestId('PlayIcon')
    const pauseIcon = await getByTestId('PauseIcon')
    expect(await pauseIcon.isExisting()).toBe(false) // isExisting too slow
    await playIcon.click()
    await pauseIcon.waitForExist()
    await captureScreenshot('home-played')
    await app.client.waitUntil(
      async () => (await agendaTime0.getText()) === '00:00:59',
    )
    await pauseIcon.click()
    await playIcon.waitForExist()
    await captureScreenshot('home-paused')
    expect(await agendaTime1.getText()).toBe('00:03:00')
    expect(await totalTime.getText()).toBe('00:03:59')
    expect(await idealTime.getText()).toBe('00:00:59')
    await playIcon.click()
    const lapIcon = await getByTestId('LapIcon')
    await lapIcon.click()
    await app.client.waitUntil(
      async () => (await agendaTime1.getText()) === '00:02:59',
    )
    await pauseIcon.click()
    expect(await agendaTime0.isExisting()).toBe(false)
    expect(await totalTime.getText()).toBe('00:03:58')
    expect(await idealTime.getText()).toBe('00:03:58')
    await captureScreenshot('home-lapped')
    await playIcon.click()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await lapIcon.click()
    await playIcon.waitForExist()
    expect(await agendaTime0.isExisting()).toBe(true)
    expect(await agendaTime0.getText()).toBe('00:00:59')
    await captureScreenshot('home-finished')
  })
})
