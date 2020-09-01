import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Slider from '@material-ui/core/Slider'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { AppLayout } from '../components/atoms/AppLayout'
import { useSelector, useDispatch } from '../hooks/redux'
import { useTranslationWithKey } from '../hooks/useTranslationWithKey'

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    form: {
      marginLeft: 14,
    },
    inputBlock: {
      '& + &': {
        marginTop: 20,
      },
    },
    laps: {
      width: '100%',
    },
    slider: {
      '& .MuiSlider-markLabel': {
        color: '#aaa',
      },
      '& .MuiSlider-markLabelActive': {
        color: '#fff',
      },
    },
  }),
)

const Home: React.FC = () => {
  const classes = useStyles({})
  const history = useHistory()
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
    history.push('/')
  }, [dispatch, history, setting])

  const saveAndGotoHome = React.useCallback(() => {
    dispatch({ type: 'setting/saveRequest', payload: setting })
    history.push('/')
  }, [dispatch, history, setting])

  React.useEffect(() => {
    dispatch({ type: 'setting/loadRequest' })
  }, [dispatch])

  return (
    <AppLayout
      className={classes.root}
      nav={
        <IconButton
          color="inherit"
          onClick={resetAndGotoHome}
          data-testid="BackIcon"
        >
          <NavigateBeforeIcon />
        </IconButton>
      }
      navRight={
        <IconButton
          color="inherit"
          onClick={saveAndGotoHome}
          data-testid="SaveIcon"
        >
          <SaveIcon />
        </IconButton>
      }
      body={
        <div className={classes.root}>
          <div className={classes.inputBlock}>
            <Typography>{t(k.agendaList)}</Typography>
            <TextareaAutosize
              className={classes.laps}
              rowsMin={10}
              rowsMax={20}
              placeholder={t(k.agendaListPlaceholder)}
              value={setting.agendaListText}
              onChange={onChangeLapsText}
              data-testid="AgendaListTextarea"
            />
          </div>
          <div className={classes.inputBlock}>
            <Typography>{t(k.backgroundTransparentRate)}</Typography>
            <Slider
              className={classes.slider}
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
          </div>
          <div className={classes.inputBlock}>
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
          </div>
          {process?.platform === 'darwin' && (
            <div className={classes.inputBlock}>
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
            </div>
          )}
          <div className={classes.inputBlock}>
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
          </div>
        </div>
      }
    />
  )
}

export default Home
