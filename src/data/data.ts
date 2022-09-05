

function createData(
    title: string, // Наименование работ
    unit: string, // Ед. изм.
    quantity: number, // Количество
    unitPrice: number, // Цена за ед.
    price: number, // Стоимость
) {
    return { title, unit, quantity, unitPrice, price};
}

const explorer = {
    id: "1",
    type: "Level",
    name: "icon_folder_1",
    isFolder: true,
    value: [createData('Frozen yoghurt', "159", 6.0, 24, 4.0),],
    items: [
        {
            name: "icon_folder_2",
            isFolder: true,
            value: [createData( 'Frozen yoghurt', "159", 6.0, 24, 4.0),
            ],
            items: [
                {
                    name: "file",
                    isFolder: true,
                    value: [createData( 'Frozen yoghurt', "159", 6.0, 24, 4.0)],
                    items: []
                },
                {
                    name: "file",
                    isFolder: false,
                    value: [createData('Frozen yoghurt', "159", 6.0, 24, 4.0)],
                    items: []
                }
            ]
        }
    ],
};

export default explorer;