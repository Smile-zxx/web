let obj = {
    ruyuanLog: {
        API_questionnaire: [
            {
                data: {},
                name: "吞咽功能评定",
                state: "已完成"
            }, {
                data: {},
                name: "吞咽功能评定",
                state: "已完成"
            }, {
                data: {},
                name: "吞咽功能评定",
                state: "已完成"
            }, {
                data: {},
                name: "吞咽功能评定",
                state: "已完成"
            }, {
                data: {},
                name: "吞咽功能评定",
                state: "已完成"
            },
        ],
        API_treatLog: {
            API_patientState: ["西药治疗"],
            API_treatment: ["西药治疗"],
            API_prescription: [
                {
                    API_drugsName: "含曲林片",
                    API_drugsNumberUnits: "盒",
                    API_drugsNumber: "2",
                    API_drugsUsage: "一次两粒",
                    API_useFrequency: "一天一次",
                    API_useTime: "饭后",

                }
            ]
        },
    }
}
console.log(JSON.stringify(obj))