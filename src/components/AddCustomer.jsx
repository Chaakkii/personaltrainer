import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function AddCustomers({ addCustomer }) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState ({
        firstname: '',
        lastname: '', 
        streetaddress: '', 
        postcode: '',
        city: '',
        email: '',
        phone: '',
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        const newCustomer = { ...customer };
        addCustomer(newCustomer);
        handleClose();
    }

    return ( 
        <React.Fragment>
            <Button variant="contained" color="success" onClick={handleClickOpen}>
                Add customer
            </Button>

            <Dialog
            open={open}
            onClose={handleClose}
            >

            <DialogTitle>New Customer</DialogTitle>
            
            <DialogContent>
            <TextField
            margin="dense"
            label="Firstname"
            value={customer.firstname}
            onChange={e => setCustomer({...customer, firstname: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="Lastname"
            value={customer.lastname}
            onChange={e => setCustomer({...customer, lastname: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="Address"
            value={customer.streetaddress}
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="Postcode"
            value={customer.postcode}
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="City"
            value={customer.city}
            onChange={e => setCustomer({...customer, city: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="Email"
            value={customer.email}
            onChange={e => setCustomer({...customer, email: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="Phone"
            value={customer.phone}
            onChange={e => setCustomer({...customer, phone: e.target.value})}
            fullWidth
            variant="standard"
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
            </Dialog>


        </React.Fragment>
    );


}