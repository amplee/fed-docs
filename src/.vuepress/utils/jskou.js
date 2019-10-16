/**
 * Create by zhanpeng.lian on 2019-10-16
 * @author: zhanpeng.lian
 * 当前文件用于请求 飞冰接口 拿到文章推荐列表
 */
import axios from 'axios';

// 接口地址：
// http://jskou.com:3003/contents/list?type=1&page=1&pageSize=30
// type 文章来源类型
//      0 前端艺术家
//      1 飞冰早报

export default function ({ type = 0, page = 0 }) {
    return new Promise((resolve, reject) => {
        axios.get('http://jskou.com:3003/contents/list', {
            params: { type, page, pageSize: 30 }
        }).then(res => {
            const response = res.data || {};
            if (response.code === 0) {
                resolve({
                    data: (response.data || []).map(data => {
                        data.time  = data.time.split('T')[0];
                        return data;
                    }),
                    pageTotal: Math.ceil(response.total / 30)
                });
            } else {
                reject(response);
            }
        }).catch(res => {
            reject(res);
        });
    });
}
