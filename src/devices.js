export let devices = {
    ecs: [
        {
            name: "ecs_apart",
            type: "fieldSelect",
            title: "Укажите параметры корпуса шкафа",
            values: [
                {
                    name: "Щит  мет. ЩМП-250х300х140 EKF (ЩМП-02) IP31",
                    value: 1
                },
                {
                    name: "Щит мет. ЩРУВ 12 мод. с окном IP31 (440Х340Х140) EKF",
                    value: 2
                },
                {
                    name: "Щит мет. ЩМП-400Х400Х150 EKF(ЩМП-05) IP31",
                    value: 3
                },

            ]
        }
    ],
    pmeter: [
        {
            name: "pmeter_voltage",
            type: "fieldSelect",
            title: "Напряжение",
            values: [
                {
                    name: "Однофазный",
                    value: 230
                },
                {
                    name: "Трехфазный",
                    value: 400
                }
            ]
        },
        {
            name: "pmeter_mnf",
            type: "fieldSelect",
            title: "Производитель",
            values: [
                {
                    name: "Ленэлектро",
                    value: 84
                },
                {
                    name: "Инкотекс (Меркурий)",
                    value: 82
                },
                {
                    name: "ЛЭМЗ",
                    value: 85
                }
            ]
        },
        {
            name: "pmeter_tarif",
            type: "fieldSelect",
            title: "Тариф",
            values: [
                {
                    name: "Однотарифный",
                    value: 1
                },
                {
                    name: "многотарифный",
                    value: 2
                }
            ]
        },
        {
            name: "pmeter_amount",
            type: "fieldInput",
            title: "Количество",
            value: ''
        }
    ],
    cb: [
        {
            name: "cb_current",
            type: "fieldSelect",
            title: "Номинальный ток, А",
            values: [6, 10, 16, 20, 25, 32, 40, 50]
        },
        {
            name: "cb_voltage",
            type: "fieldSelect",
            title: "Напряжение, В",
            values: [230, 400]
        },
        {
            name: "cb_mnf",
            type: "fieldSelect",
            title: "Производитель",
            values: [
                {
                    name: "IEK",
                    value: 3
                },
                {
                    name: "ABB",
                    value: 6
                }
            ]
        },
        {
            name: "cb_series",
            type: "fieldSelect",
            title: "Серия",
            values: [
                {
                    name: "Квартирная серия ВА47-29",
                    value: 0
                },
                {
                    name: "Квартирная серия SH200",
                    value: 1
                }
            ]
        },
        {
            name: "cb_amount",
            type: "fieldInput",
            title: "Количество",
            value: ''
        }
    ],
    uzo: [
        {
            name: "uzo_current",
            type: "fieldSelect",
            title: "Номинальный ток, А",
            values: [16, 20, 25, 32, 40, 50, 63]
        },
        {
            name: "uzo_voltage",
            type: "fieldSelect",
            title: "Напряжение, В",
            values: [
                {
                    name: "2х полюсное (230 В)",
                    value: 230
                },
                {
                    name: "4х полюсное (400 В)",
                    value: 400
                }
            ]
        },
        {
            name: "uzo_mnf",
            type: "fieldSelect",
            title: "Производитель",
            values: [
                {
                    name: "IEK",
                    value: 3
                },
                {
                    name: "ABB",
                    value: 6
                }
            ]
        },
        {
            name: "uzo_series",
            type: "fieldSelect",
            title: "Серия",
            values: [
                {
                    name: "ВД1-63",
                    value: 0
                },
                {
                    name: "BasicM",
                    value: 1
                }
            ]
        },
        {
            name: "uzo_amount",
            type: "fieldInput",
            title: "Количество",
            value: ''
        }
    ],
    difcb: [
        {
            name: "difcb_current",
            type: "fieldSelect",
            title: "Номинальный ток, А",
            values: [6, 10, 16, 20, 25, 32, 40, 50, 63]
        },
        {
            name: "difcb_voltage",
            type: "fieldSelect",
            title: "Напряжение, В",
            values: [
                {
                    name: "2х полюсное (230 В)",
                    value: 230
                },
                {
                    name: "4х полюсное (400 В)",
                    value: 400
                }
            ]
        },
        {
            name: "difcb_mnf",
            type: "fieldSelect",
            title: "Производитель",
            values: [
                {
                    name: "IEK",
                    value: 3
                },
                {
                    name: "ABB",
                    value: 6
                }
            ]
        },
        {
            name: "difcb_series",
            type: "fieldSelect",
            title: "Серия",
            values: [
                {
                    name: "АД12",
                    value: 0
                },
                {
                    name: "BasicM",
                    value: 1
                }
            ]
        },
        {
            name: "difcb_amount",
            type: "fieldInput",
            title: "Количество",
            value: ''
        }
    ]
}