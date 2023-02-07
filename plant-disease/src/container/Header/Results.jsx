import React, { useState } from 'react'
import { images, data } from '../../constants';

import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import './Results.css';

const Results = (props) => {

    const [openHighConfidenceDialog, setOpenHighConfidenceDialog] = useState(false);
    const [openLowConfidenceDialog, setOpenLowConfidenceDialog] = useState(false);
    const [openLowestConfidenceDialog, setOpenLowestConfidenceDialog] = useState(false);

    const ResultData = props.CropAnalysis;

    const handleClickOpen1 = () => {
        setOpenHighConfidenceDialog(true);
    }
    const handleClickClose1 = () => {
        setOpenHighConfidenceDialog(false);
    }
    const handleClickOpen2 = () => {
        setOpenLowConfidenceDialog(true);
    }
    const handleClickClose2 = () => {
        setOpenLowConfidenceDialog(false);
    }
    const handleClickOpen3 = () => {
        setOpenLowestConfidenceDialog(true);
    }
    const handleClickClose3 = () => {
        setOpenLowestConfidenceDialog(false);
    }

    return (
        <div className='app__Result' >
            <div className='app__Result-content'>
                <h2 className='app__Result-content-h2'>
                    There are three possible conclusions based on the analysis of uploaded image
                </h2>
                <p className='p__opensans' >
                    Each of these Emojis represent our confidence level of a conclusion. Please click them to view details
                </p>
            </div>

            <div className='app__Result-display'>
                <div className='app__Result-emoji' onClick={handleClickOpen1}>
                    <img src={images.smilingFace} alt="highest-confidence" />
                </div>
                <div className='app__Result-emoji' onClick={handleClickOpen2}>
                    <img src={images.neutralFace} alt="high-confidence" />
                </div>
                <div className='app__Result-emoji' onClick={handleClickOpen3}>
                    <img src={images.disappointedFace} alt="low-confidence" />
                </div>
            </div>


            <Dialog
                open={openHighConfidenceDialog}
                onClose={handleClickClose1}
                aria-labelledby="High Confidence Result">
                <DialogTitle id="highConfResult">{ResultData[0].crop_name}</DialogTitle>
                <DialogContent dividers>

                    <p className='app__cropImage-dialog' style={{ color: '#F50057', fontWeight: '700' }}>Disease: </p>
                    <p className='app__cropImage-dialog' style={{ margin: "0.5rem 0" }}>{ResultData[0].disease}</p>
                    <p className='app__cropImage-dialog' style={{ color: '#F50057', fontWeight: '700' }}>Symptoms: </p>
                    <p className='app__cropImage-dialog' style={{ margin: "0.5rem 0" }}>{ResultData[0].symptoms}</p>

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClickClose1}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* High Confidence result */}
            <Dialog
                open={openLowConfidenceDialog}
                onClose={handleClickClose2}
                aria-labelledby="High Confidence Result">
                <DialogTitle id="highConfResult">{ResultData[1].crop_name}</DialogTitle>
                <DialogContent dividers>

                    <p className='app__cropImage-dialog' style={{ color: '#F50057', fontWeight: '700' }}>Disease: </p>
                    <p className='app__cropImage-dialog' style={{ margin: "0.5rem 0" }}>{ResultData[1].disease}</p>
                    <p className='app__cropImage-dialog' style={{ color: '#F50057', fontWeight: '700' }}>Symptoms: </p>
                    <p className='app__cropImage-dialog' style={{ margin: "0.5rem 0" }}>{ResultData[1].symptoms}</p>

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClickClose2}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Low Confidence result */}
            <Dialog
                open={openLowestConfidenceDialog}
                onClose={handleClickClose3}
                aria-labelledby="High Confidence Result">
                <DialogTitle id="highConfResult">{ResultData[2].crop_name}</DialogTitle>
                <DialogContent dividers>

                    <p className='app__cropImage-dialog' style={{ color: '#F50057', fontWeight: '700' }}>Disease: </p>
                    <p className='app__cropImage-dialog' style={{ margin: "0.5rem 0" }}>{ResultData[2].disease}</p>
                    <p className='app__cropImage-dialog' style={{ color: '#F50057', fontWeight: '700' }}>Symptoms: </p>
                    <p className='app__cropImage-dialog' style={{ margin: "0.5rem 0" }}>{ResultData[2].symptoms}</p>

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClickClose3}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Results;