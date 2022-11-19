let obj = {
    title: "Barthle指数评定量表",
    time: "",
    partOne: [
        {
            text: "进食",
            options: [
                {
                    text: "完全独立",
                    socre: 10
                }, {
                    text: "需要部分帮助",
                    socre: 5
                }, {
                    text: "需要极大帮助",
                    socre: 0
                }, {
                    text: "完全依赖",
                    socre: -1
                }
            ],
            selected: ""
        },
        {
            text: "洗澡",
            options: [
                {
                    text: "完全独立",
                    socre: 5
                }, {
                    text: "需要部分帮助",
                    socre: 0
                }, {
                    text: "需要极大帮助",
                    socre: -1
                }, {
                    text: "完全依赖",
                    socre: -1
                }
            ],
            selected: ""
        },
        {
            text: "修饰",
            options: [
                {
                    text: "完全独立",
                    socre: 5
                }, {
                    text: "需要部分帮助",
                    socre: 0
                }, {
                    text: "需要极大帮助",
                    socre: -1
                }, {
                    text: "完全依赖",
                    socre: -1
                }
            ],
            selected: ""
        },
        {
            text: "穿衣",
            options: [
                {
                    text: "完全独立",
                    socre: 10
                }, {
                    text: "需要部分帮助",
                    socre: 5
                }, {
                    text: "需要极大帮助",
                    socre: 0
                }, {
                    text: "完全依赖",
                    socre: -1
                }
            ],
            selected: ""
        },
        {
            text: "控制大便",
            options: [
                {
                    text: "完全独立",
                    socre: 10
                }, {
                    text: "需要部分帮助",
                    socre: 5
                }, {
                    text: "需要极大帮助",
                    socre: 0
                }, {
                    text: "完全依赖",
                    socre: -1
                }
            ],
            selected: ""
        },
        {
            text: "控制小便",
            options: [
                {
                    text: "完全独立",
                    socre: 10
                }, {
                    text: "需要部分帮助",
                    socre: 5
                }, {
                    text: "需要极大帮助",
                    socre: 0
                }, {
                    text: "完全依赖",
                    socre: -1
                }
            ],
            selected: ""
        },
        {
            text: "如厕",
            options: [
                {
                    text: "完全独立",
                    socre: 10
                }, {
                    text: "需要部分帮助",
                    socre: 5
                }, {
                    text: "需要极大帮助",
                    socre: 0
                }, {
                    text: "完全依赖",
                    socre: -1
                }
            ],
            selected: ""
        },
        {
            text: "桌椅转移",
            options: [
                {
                    text: "完全独立",
                    socre: 15
                }, {
                    text: "需要部分帮助",
                    socre: 10
                }, {
                    text: "需要极大帮助",
                    socre: 5
                }, {
                    text: "完全依赖",
                    socre: 0
                }
            ],
            selected: ""
        },
        {
            text: "平地行走",
            options: [
                {
                    text: "完全独立",
                    socre: 15
                }, {
                    text: "需要部分帮助",
                    socre: 10
                }, {
                    text: "需要极大帮助",
                    socre: 5
                }, {
                    text: "完全依赖",
                    socre: 0
                }
            ],
            selected: ""
        },
        {
            text: "上下楼梯",
            options: [
                {
                    text: "完全独立",
                    socre: 10
                }, {
                    text: "需要部分帮助",
                    socre: 5
                }, {
                    text: "需要极大帮助",
                    socre: 0
                }, {
                    text: "完全依赖",
                    socre: -1
                }
            ],
            selected: ""
        },
    ],
    totalScore: "",
    result: {
        options: [
            "重度",
            "中度",
            "轻度",
            "无需",
        ],
        selected: ""
    },
    notes: [
        "根据患者实施情况给予评分，然后计算总分。",
        "根据病人Barthel指数（BI）总分判断病人自理能力:≤40分，重度依赖，全部需要他人照护;41-60分，中度依赖，大部分需要他人照护:61-99分，轻度依赖，少部分需要他人照护:100分，无需依赖，不需要他人照护。",
        "根据病人自理能力给予相应的帮助和照顾。",
        "根据病员实际情况，得出相应分值，并统计总分，即可得出该病人Barthel评分数。",
    ],
    others: ""

}

let obj2 = {
    title: "护理记录首页",
    time: "",
    diagnosis: "",
    tizheng: {
        T: "",//温度
        P: "",//血压
        R: "",//呼吸
        BP: "",//血压
        BS: "",//空腹/随机血糖
        SPO2: "",//血氧饱和度
        HEIGHT: "",//身高
        WEIGHT: "",//体重
    },
    // 自理
    zili: {
        options: [
            "自理",
            "部分自理",
            "不能自理",
        ],
        selected: ""
    },
    goutong: {
        options: [
            "正常",
            "下降",
            "不能表达",
        ],
        selected: ""
    },
    shuimian: {
        options: [
            "正常",
            "异常",
            "入睡困难",
            "易醒",
            "多梦",
            "服镇静剂",
        ],
        selected: ""
    },
    // 排泄情况
    paixie: {
        // 小便
        xiaobian: {
            isNormal: "",
            badOptions: ["院外带入尿管", "失禁", "尿潴留", "其他"],
            selected: []
        },
        // 大便
        dabian: {
            isNormal: "",
            badOptions: ["便秘", "大便失禁", "腹泻", "其他"],
            selected: []
        }
    },
    pifu: {
        isNormal: "",
        badOptions: ["水肿", "水泡", "破损", "压疮"],
        selected: []
    },
    // 过敏史
    allergyHistory: "",//true or false
    // 专科情况
    zhuanke: {
        // 意识状态
        yishi: {
            options: ['清醒', '嗜睡', '昏睡', '昏迷', '意识模糊', '儋妄', '特殊'],
            selected: ''
        },
        // 认知
        renzhi: {
            options: ['查体不配合', '正常', '下降'],
            selected: ''
        },
        milu: {
            options: ['有', '无',],
            selected: ''
        },//true or false
        yundong: {
            options: ['查体不配合', '正常', '下降'],
            positionOptions: ['左上', '左下', '右上', '右下'],
            selected: '',
            positionSelected: []
        },
        tunyan: {
            options: ['查体不配合', '正常', '异常'],
            selected: '',
        },
        ganjue: {
            options: ['查体不配合', '正常', '迟钝', '刺激性症状', '特殊'],
            selected: '',
        },
        tengtong: {
            options: ['有', '无'],
            selected: '',
            score
        },





    },
    peihu: "",//true or false
    yachuang: "",//true or false
    diedao: "",//true or false
    richang: "",//true or false
}