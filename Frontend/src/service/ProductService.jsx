const data = {
    data: [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'pH-Wert Sensor',
            image: 'phsensor.jpeg',
            price: 15.99,
            category: 'Sensor',
            rating: 4,
            inventoryStatus: 'INSTOCK'
        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Temperatursensor',
            image: 'temperaturesensor.jpeg',
            price: 15.99,
            category: 'Sensor',
            rating: 4,
            inventoryStatus: 'INSTOCK'
        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'Wassererstandsensor',
            image: 'waterlevelsensor.jpeg',
            price: 9.99,
            category: 'Sensor',
            rating: 3,
            inventoryStatus: 'LOWSTOCK'
        },
        {
            id: '1003',
            code: '244wgerg2',
            name: 'Wasserqualitätssensor (TDS)',
            image: 'waterqualitysensor.jpeg',
            price: 19.99,
            category: 'Sensor',
            rating: 5,
            inventoryStatus: 'INSTOCK'
        }
    ]
};

export const ProductService = {
    getProductsSmall() {
        return Promise.resolve(data.data);
    }
};