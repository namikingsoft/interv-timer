import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SaveIcon from '@mui/icons-material/Save'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Slider from '@mui/material/Slider'
import Tooltip from '@mui/material/Tooltip'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { AppLayout } from '../components/atoms/AppLayout'
import { useSelector, useDispatch } from '../hooks/redux'
import { useTranslationWithKey } from '../hooks/useTranslationWithKey'

const InputBlockDiv = styled('div')(() => ({
  '& + &': {
    marginTop: 20,
  },
}))

const SliderDiv = styled('div')(() => ({
  '& .MuiSlider-markLabel': {
    color: '#aaa',
  },
  '& .MuiSlider-markLabelActive': {
    color: '#fff',
  },
}))

const styleLaps = { width: '100%' } as const

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { t, k } = useTranslationWithKey()

  const setting = useSelector(({ setting }) => setting)

  const dispatch = useDispatch()

  const onChangeLapsText = React.useCallback(
    (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
      dispatch({
        type: 'setting/setAgendaListText',
        payload: event.currentTarget.value,
      })
    },
    [dispatch],
  )

  const onChangeAvoidFinished = React.useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      // @ts-expect-error want React.SyntheticEvent<CheckboxElement>
      const checked = !!event.target.checked
      dispatch({
        type: 'setting/setAvoidFinished',
        payload: checked,
      })
    },
    [dispatch],
  )

  const onChangeSkinMode = React.useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      // @ts-expect-error want React.SyntheticEvent<CheckboxElement>
      const checked = !!event.target.checked
      dispatch({
        type: 'setting/setSkinMode',
        payload: checked ? 'circle' : undefined,
      })
    },
    [dispatch],
  )

  const onChangeEnabledAutoUpdater = React.useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      // @ts-expect-error want React.SyntheticEvent<CheckboxElement>
      const checked = !!event.target.checked
      dispatch({
        type: 'setting/setEnabledAutoUpdater',
        payload: checked,
      })
    },
    [dispatch],
  )

  const onChangeBackgroundAlphaRate = React.useCallback(
    (_, payload: number) => {
      dispatch({
        type: 'setting/setBackgroundAlphaRate',
        payload,
      })
    },
    [dispatch],
  )

  const onChangeVisibleOnAllWorkspaces = React.useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      // @ts-expect-error want React.SyntheticEvent<CheckboxElement>
      const checked = !!event.target.checked
      dispatch({
        type: 'setting/setVisibleOnAllWorkspaces',
        payload: checked,
      })
    },
    [dispatch],
  )

  const resetAndGotoHome = React.useCallback(() => {
    dispatch({ type: 'setting/loadRequest', payload: setting })
    navigate('/')
  }, [dispatch, history, setting])

  const saveAndGotoHome = React.useCallback(() => {
    dispatch({ type: 'setting/saveRequest', payload: setting })
    navigate('/')
  }, [dispatch, history, setting])

  React.useEffect(() => {
    dispatch({ type: 'setting/loadRequest' })
  }, [dispatch])

  return (
    <AppLayout
      nav={
        <IconButton
          color="inherit"
          onClick={resetAndGotoHome}
          data-testid="BackIcon"
        >
          <Tooltip title={t(k.back)} arrow>
            <NavigateBeforeIcon />
          </Tooltip>
        </IconButton>
      }
      navRight={
        <IconButton color="inherit" onClick={saveAndGotoHome}>
          <Tooltip title={t(k.save)} arrow>
            <SaveIcon data-testid="SaveIcon" />
          </Tooltip>
        </IconButton>
      }
      body={
        <div>
          <InputBlockDiv>
            <Typography>{t(k.agendaList)}</Typography>
            <TextareaAutosize
              style={styleLaps}
              minRows={10}
              maxRows={20}
              placeholder={t(k.agendaListPlaceholder)}
              value={setting.agendaListText}
              onChange={onChangeLapsText}
              data-testid="AgendaListTextarea"
            />
          </InputBlockDiv>
          <InputBlockDiv>
            <Typography>{t(k.backgroundTransparentRate)}</Typography>
            <SliderDiv>
              <Slider
                defaultValue={20}
                min={0}
                max={1}
                step={0.01}
                valueLabelDisplay="auto"
                value={setting.backgroundAlphaRate}
                onChange={onChangeBackgroundAlphaRate}
                marks={[
                  {
                    value: 0.2,
                    label: '20%',
                  },
                  {
                    value: 0.5,
                    label: '50%',
                  },
                  {
                    value: 0.8,
                    label: '80%',
                  },
                ]}
              />
            </SliderDiv>
          </InputBlockDiv>
          <InputBlockDiv>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={setting.avoidFinished}
                    onChange={onChangeAvoidFinished}
                  />
                }
                label={t(k.avoidFinishedAgenda)}
              />
            </FormGroup>
          </InputBlockDiv>
          {window.platform === 'darwin' && (
            <InputBlockDiv>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={setting.visibleOnAllWorkspaces}
                      onChange={onChangeVisibleOnAllWorkspaces}
                      data-testid="VisibleOnAllWorkspacesSwitch"
                    />
                  }
                  label={t(k.visibleOnAllWorkspaces)}
                />
              </FormGroup>
            </InputBlockDiv>
          )}
          <InputBlockDiv>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={setting.skinMode === 'circle'}
                    onChange={onChangeSkinMode}
                    data-testid="SkinModeCircleSwitch"
                  />
                }
                label={t(k.skinMode)}
              />
            </FormGroup>
          </InputBlockDiv>
          <InputBlockDiv>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={setting.enabledAutoUpdater}
                    onChange={onChangeEnabledAutoUpdater}
                    data-testid="EnabledAutoUpdater"
                  />
                }
                label={t(k.enabledAutoUpdater)}
              />
            </FormGroup>
          </InputBlockDiv>
        </div>
      }
    />
  )
}

export default Home
