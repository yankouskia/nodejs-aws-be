
export const getProducts = async () => products

export const getProduct = async (id: number) => products.find(p => p.id === id)

// Mock data
let products = [
    {
        id: 1,
        name: 'First'
    },
    {
        id: 2,
        name: 'Second'
    },
    {
        id: 3,
        name: 'Third'
    }
]