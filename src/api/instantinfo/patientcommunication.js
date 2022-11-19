import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import store from '@store/index.js';

//获取聊天信息
export function getMessageRecord(pid) {
    Post("/api/chatinfo",
        {
            pid: pid
        }
    ).then(res => {
        let obj = res.data.chat;
        obj.forEach((element, index) => {
            element.messages.forEach(msg => {
                if (msg.fromid != element.id) {
                    msg.self = true
                }
            })
            if (element.user.role == '专家') {
                obj.splice(index, 1)
            }
        });
        // 剔除了专家用户
        // 区分了收到的还是发送的
        store.commit("patientCommunication/update", obj)
    })

}
