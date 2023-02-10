import { useState, Fragment } from 'react';
import {useSelector} from 'react-redux';
import {useActions} from '../../store/hooks/useActions';

import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

import VolumeSlider from '../../components/volume-slider/volume-slider.component';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-container': {
    '& .MuiPaper-root': {
      width: "100%",
      maxWidth: "550px",  // Set your width here
    },
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const SettingDialog = () => {
  const [open, setOpen] = useState(false);
  const {bgVolume, effectVolume} = useSelector(state => state.settingReducer);
  const {setBgVolume, setEffectVolume} = useActions();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setBgVolumeHandler = value => {
    setBgVolume(value);
  };

  const setEffectVolumeHandler = value => {
    setEffectVolume(value);
  };

  return (
    <Fragment>
      <IconButton color="primary" aria-label="go to setting" onClick={handleClickOpen}>
        <SettingsIcon />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Setting
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <VolumeSlider volumeProperty={{audioTitle: 'BG', volumeValue: bgVolume, setAudioVolumeFunc: setBgVolumeHandler}}/>
          <VolumeSlider volumeProperty={{audioTitle: 'Shoot', volumeValue: effectVolume, setAudioVolumeFunc: setEffectVolumeHandler}}/>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </Fragment>
  )
};

export default SettingDialog;