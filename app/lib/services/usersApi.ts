export const getUsers = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL!
    try {
        const request = await fetch(API_URL, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json', 
        }
    });
        const response = await request.json()
        
    return response;

    } catch (error) {
        throw error;
    }
}