import { useEffect, useState } from "react";
import { addCustomer, fetchCustomers, updateCustomer, deleteCustomer } from "../customerapi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AddCustomers from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import DeleteIcon from '@mui/icons-material/Delete';
import AddTraining from "./AddTraining";
import { CSVLink } from "react-csv";
import { addTraining } from "../trainingapi";

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [deleteCustomers, setDeleteCustomers] = useState(null);

    const [colDef] = useState([
        { field: 'firstname', filter: true, width: 150 },
        { field: 'lastname', filter: true, width: 150 },
        { field: 'streetaddress', filter: true },
        { field: 'postcode', filter: true, width: 150 },
        { field: 'city', filter: true, width: 150 },
        { field: 'email', filter: true },
        { field: 'phone', filter: true, width: 150 },
        { field: 'edit', sortable: false,
            cellRenderer: params => <EditCustomer data={params.data} updateCustomer={handleUpdateCustomer} />, 
            width: 120
        },
        { field: 'delete', sortable: false,
            cellRenderer: params =>
                <Button size="small" color="error" variant="contained" startIcon={<DeleteIcon />} onClick={() => handleClickDelete(params.data._links.customer.href)}>
                    Delete
                </Button>
            , width: 120
        },
        { field: 'Add training', sortable: false,
            cellRenderer: params => <AddTraining customer={params.data} addTraining={handleAddTraining} />
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);


    const handleFetch = () => {
        fetchCustomers()
            .then(data => setCustomers(data))
            .catch(err => console.error(err))
    };

    const handleAddTraining = (customer, trainingData) => {
        addTraining(trainingData)
            .then(() => handleFetch())
            .catch(err => console.error(err))
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
        setDeleteCustomers(null);
    };

    const handleClickDelete = (url) => {
        setDeleteCustomers(url);
        setOpenConfirmation(true);
    };

    const handleAddCustomer = (newCustomer) => {
        addCustomer(newCustomer)
            .then(() => handleFetch())
            .catch(err => console.error(err))
    };

    const handleUpdateCustomer = (url, updatedCustomer) => {
        updateCustomer(url, updatedCustomer)
            .then(() => handleFetch())
            .catch(err => console.error(err))
    };

    const handleDeleteCustomer = () => {
        if (deleteCustomers) {
            deleteCustomer(deleteCustomers)
                .then(() => {
                    handleFetch();
                    handleCloseConfirmation();
                })
                .catch(err => console.error(err));
        }
    };

    const exportData = () => {
        return customers.map(customer => ({
            'Firstname': customer.firstname,
            'Lastname': customer.lastname,
            'StreetAddress': customer.streetaddress,
            'Postcode': customer.postcode,
            'City': customer.city,
            'Email': customer.email,
            'Phone': customer.phone,
        }));
    };

    return (
        <>
            <AddCustomers addCustomer={handleAddCustomer} />

            <div className="ag-theme-material" style={{ height: 600, width: 1600 }}>
                <AgGridReact
                    rowData={customers}
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
                <DialogTitle>Delete Customer</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this customer?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation}>Cancel</Button>
                    <Button onClick={handleDeleteCustomer} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            <CSVLink data={exportData()} filename={"customerdata.csv"}>
                <Button variant="contained" color="primary">Export</Button>
            </CSVLink>
        </>


    );
}

export default Customerlist;