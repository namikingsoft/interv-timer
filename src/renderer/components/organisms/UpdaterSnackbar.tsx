import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslationWithKey } from '../../hooks/useTranslationWithKey'

interface Props {
  className?: string
  version: string
  percent: number
  open: boolean
  onClose: () => void
  onRestart: () => void
}

export const UpdaterSnackbar: React.FC<Props> = ({
  className,
  version,
  percent,
  open,
  onClose,
  onRestart,
}) => {
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
            sx={{ marginTop: 5 }}
            variant="determinate"
            value={percent}
          />
        </Alert>
      }
    />
  )
}
