import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import { useTranslationWithKey } from '../../hooks/useTranslationWithKey'

interface Props {
  className?: string
  version: string
  percent: number
  open: boolean
  onClose: () => void
  onRestart: () => void
}

const useStyles = makeStyles(() =>
  createStyles({
    progress: {
      marginTop: 5,
    },
  }),
)

export const UpdaterSnackbar: React.FC<Props> = ({
  className,
  version,
  percent,
  open,
  onClose,
  onRestart,
}) => {
  const classes = useStyles()
  const { t, k } = useTranslationWithKey()
  const downloaded = percent >= 100
  const tag = `v${version.replace(/^v/, '')}`

  return (
    <Snackbar
      className={className}
      open={open}
      action={
        <Alert
          severity="info"
          icon={false}
          onClose={onClose}
          action={
            <>
              <Button
                color="secondary"
                size="small"
                onClick={onRestart}
                disabled={!downloaded}
              >
                {t(k.restart)}
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={onClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        >
          <div>
            {`${t(k.newVersion)} `}
            <Link
              // TODO: pick updater event
              href={`https://github.com/namikingsoft/interv-timer/releases/tag/${tag}`}
              target="_blank"
              rel="noreferrer"
            >
              {tag}
            </Link>
          </div>
          <LinearProgress
            className={classes.progress}
            variant="determinate"
            value={percent}
          />
        </Alert>
      }
    />
  )
}
