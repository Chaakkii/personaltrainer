export const fetchTrainings = async () => {
    const response = await fetch(import.meta.env.VITE_API_GETTRAININGS);
    if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
    return await response.json();
  

}
export const addTraining = async (trainingData) => {
    try {
        const response = await fetch(import.meta.env.VITE_API_TRAINING, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...trainingData}),
        });
        if (!response.ok) {
            throw new Error("Error when adding training: " + response.statusText);
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
};
