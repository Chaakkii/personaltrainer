import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';

export default function EditCustomer({ data, updateCustomer }) {
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
        setCustomer({
            firstname: data.firstname,
            lastname: data.lastname,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city,
            email: data.email,
            phone: data.phone
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        updateCustomer(data._links.customer.href, customer)
        handleClose();
    }

    return ( 
        <React.Fragment>
            <Button variant="outlined" startIcon={<EditIcon />} onClick={handleClickOpen}>
                Edit
            </Button>

            <Dialog
            open={open}
            onClose={handleClose}
            >

            <DialogTitle>Edit Customer</DialogTitle>
            
            <DialogContent>
            <TextField
            margin="dense"
            label="firstname"
            value={customer.firstname}
            onChange={e => setCustomer({...customer, firstname: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="lastname"
            value={customer.lastname}
            onChange={e => setCustomer({...customer, lastname: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="address"
            value={customer.streetaddress}
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="postcode"
            value={customer.postcode}
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="city"
            value={customer.city}
            onChange={e => setCustomer({...customer, city: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="email"
            value={customer.email}
            onChange={e => setCustomer({...customer, email: e.target.value})}
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            label="phone"
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
