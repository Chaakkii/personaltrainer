import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

export default function AddTraining({ customer, addTraining }) {

    console.log(customer)

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: new Date(),
        duration: '',
        activity: '',
        customer: customer._links.self.href,
    })


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        addTraining(customer, training);
        handleClose();
    };

    return (
        <React.Fragment>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
                Add Training
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training for {customer.firstname} {customer.lastname}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        label="Activity"
                        value={training.activity}
                        onChange={e => setTraining({...training, activity: e.target.value})}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        label="Duration (minutes)"
                        type="number"
                        value={training.duration}
                        onChange={e => setTraining({...training, duration: e.target.value})}
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            margin="dense"
                            label="Date"
                            type="datetime-local"
                            value={training.date}
                            onChange={e => setTraining({...training, date: newDate.toISOString()})}
                            fullWidth
                            ampm={false}
                        />
                    </LocalizationProvider>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}