export const fetchCustomers = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_API_CUSTOMERS);
        if (!response.ok)
            throw new Error("Error in fetch: " + response.statusText);
        const data = await response.json();
        return data._embedded.customers;
    } catch (err) {
        return console.error(err);
    }
}

export const addCustomer = async (newCustomer) => {
    try {
        const response = await fetch(import.meta.env.VITE_API_CUSTOMERS, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        });
        if (!response.ok)
            throw new Error("Error when adding customer: " + response.statusText);
        return await response.json();
    } catch (err) {
        return console.error(err);
    }

}

export const updateCustomer = async (url, updatedCustomer) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        });
        if (!response.ok)
            throw new Error("Error when updating: " + response.statusText);
        return await response.json();
    } catch (err) {
        return console.error(err);
    }
}

export const deleteCustomer = async (url) => {
    try {
        const response = await fetch(url, { 
            method: 'DELETE' });
        if (!response.ok) {
            throw new Error("Error in deletion: " + response.statusText);
        }
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}
