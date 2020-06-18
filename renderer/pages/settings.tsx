import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Slider from '@material-ui/core/Slider'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { useSelector, useDispatch } from '../hooks/redux'
import { useTranslationWithKey } from '../hooks/useTranslationWithKey'

const textBorderColor = '#333'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(4),
      color: 'white',
      textShadow: `${textBorderColor} 1px 1px 0, ${textBorderColor} -1px -1px 0, ${textBorderColor} -1px 1px 0, ${textBorderColor} 1px -1px 0, ${textBorderColor} 0px 1px 0, ${textBorderColor}  0 -1px 0, ${textBorderColor} -1px 0 0, ${textBorderColor} 1px 0 0`,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 50,
      // Icon
      '& svg': {
        filter: 'drop-shadow(0px 0px 1.5px black);',
      },
      zIndex: 1234,
    },
    main: {
      position: 'absolute',
      overflowY: 'scroll',
      overflowX: 'hidden',
      top: 50,
      left: 0,
      width: '100%',
      bottom: 0,
      zIndex: 1234,
      paddingBottom: 20,
    },
    form: {
      marginLeft: 14,
    },
    inputBlock: {
      '& + &': {
        marginTop: 20,
      },
    },
    floatRight: {
      float: 'right',
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
  const router = useRouter()
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
      dispatch({
        type: 'setting/setAvoidFinished',
        // @ts-expect-error want React.SyntheticEvent<CheckboxElement>
        payload: !!event.target.checked,
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

  const resetAndGotoHome = React.useCallback(() => {
    dispatch({ type: 'setting/loadRequest', payload: setting })
    router.push('/home')
  }, [dispatch, router, setting])

  const saveAndGotoHome = React.useCallback(() => {
    dispatch({ type: 'setting/saveRequest', payload: setting })
    router.push('/home')
  }, [dispatch, router, setting])

  React.useEffect(() => {
    dispatch({ type: 'setting/loadRequest' })
  }, [dispatch])

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>

      <div className={classes.root}>
        <div className={classes.header}>
          <IconButton color="inherit" onClick={resetAndGotoHome}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={saveAndGotoHome}
            className={classes.floatRight}
          >
            <SaveIcon />
          </IconButton>
        </div>
        <Container className={classes.main}>
          <div className={classes.inputBlock}>
            <Typography>{t(k.agendaList)}</Typography>
            <TextareaAutosize
              className={classes.laps}
              rowsMin={10}
              rowsMax={20}
              placeholder={t(k.agendaListPlaceholder)}
              value={setting.agendaListText}
              onChange={onChangeLapsText}
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
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Home
