import React, { useEffect, useState } from "react";
import { fetchTrainings } from "../trainingapi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function Trainingslist() {
    const [trainings, setTrainings] = useState([]);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [trainingIdToDelete, setTrainingIdToDelete] = useState(null);

    const [colDef] = useState([
        { field:'date', filter: true,
        valueGetter: params => {
            const formattedDate = dayjs(params.data.date).format('DD.MM.YYYY HH:mm');
            return formattedDate;
          }},
        { field: 'duration', filter: true, width: 150}, 
        { field: 'activity', filter: true},
        { field: 'Customer', filter: true, width: 150, 
        valueGetter: params => `${params.data.customer.firstname} ${params.data.customer.lastname}` },  
        { field: 'delete',
        cellRenderer: params => 
        <Button size="small" color="error" variant="contained" startIcon={<DeleteIcon />} onClick={() => handleClickDelete(params.data.id)}>
        </Button>
        , width: 120
    },
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchTrainings()
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const handleClickDelete = (id) => {
        setTrainingIdToDelete(id);
        setOpenConfirmation(true);
    }

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
        setTrainingIdToDelete(null);
    }

    const handleConfirmDelete = () => {
        if (trainingIdToDelete) {
            fetch(import.meta.env.VITE_API_TRAINING+'/'+trainingIdToDelete, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting training');
                }
                return response.json();
            })
            .then(() => {
                handleFetch();
                handleCloseConfirmation();
            })
            .catch(error => {
                console.error('Error deleting training:', error);
            });
        }
    }

    return(
        <>
        <div className="ag-theme-material" style={{ height: 600, width: 1400, margin: 'auto' }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={colDef}
                pagination={true}
                paginationAutoPageSize={true}
                suppressCellFocus={true}
            />
        </div>
        <Dialog
            open={openConfirmation}
            onClose={handleCloseConfirmation}
        >
            <DialogTitle>Delete Training</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this training?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseConfirmation}>Cancel</Button>
                <Button onClick={handleConfirmDelete} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default Trainingslist;
