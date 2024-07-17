


export const $api = {
    guest: {
        restaurant: {
            all: async () => {
                try {
                    const res = await fetch('https://api.defactoapp.com.ng/api/v1/restaurant/all?page=1&perPage=10');
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return res.json();
                } catch (error) {
                    console.log(error);
                    throw error; // Re-throw the error to handle it outside if needed
                }
            },
        },
    },
};




