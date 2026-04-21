const data = {
    data: [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            image: 'bamboo-watch.jpg',
            price: 65.99,
            category: 'Accessories',
            rating: 4,
            inventoryStatus: 'INSTOCK'
        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Black Watch',
            image: 'black-watch.jpg',
            price: 72.99,
            category: 'Accessories',
            rating: 4,
            inventoryStatus: 'INSTOCK'
        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'Blue Band',
            image: 'blue-band.jpg',
            price: 79.99,
            category: 'Fitness',
            rating: 3,
            inventoryStatus: 'LOWSTOCK'
        },
        {
            id: '1003',
            code: '244wgerg2',
            name: 'Blue T-Shirt',
            image: 'blue-t-shirt.jpg',
            price: 29.12,
            category: 'Clothing',
            rating: 5,
            inventoryStatus: 'INSTOCK'
        },
        {
            id: '1004',
            code: 'h456wer53',
            name: 'Bracelet',
            image: 'bracelet.jpg',
            price: 15.23,
            category: 'Accessories',
            rating: 4,
            inventoryStatus: 'OUTOFSTOCK'
        }
    ]
};

export const ProductService = {
    getProductsSmall() {
        return Promise.resolve(data.data);
    }
};