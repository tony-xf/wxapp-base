
import {domain} from 'imgConst.js'

for (var map = {
    address: 'order/comment/2020-12/5b6a5f0169fca.png',
    news: 'order/comment/2020-12/5b6a5f33b34c6.png',
    follow: 'order/comment/2020-12/5b6a5f5190913.png',
    designer: 'order/comment/2020-12/5b6a5f80dc3b3.png',
    services: 'order/comment/2020-12/5b6a5f92ae918.png',
    unPay: 'order/comment/2020-12/5b6a62f470be1.png',
    unDelivery: 'order/comment/2020-12/5b6a634d299ee.png',
    delivered: 'order/comment/2020-12/5b6a635a8bdec.png',
    done: 'order/comment/2020-12/5b6a63664aba1.png',
    afterSale: 'order/comment/2020-12/5b6a6374c5cdb.png',
    custom_1: 'order/comment/2020-12/5b6a63a4daca1.png',
    custom_2: 'order/comment/2020-12/5b6a63b8d766e.png',
    custom_3: 'order/comment/2020-12/5b6a63c245767.png',
    custom_4: 'order/comment/2020-12/5b6a63cb78238.png',
    custom_5: 'order/comment/2020-12/5b6a63d495b64.png',
    pass: 'demandCustomOrder/attachment/2020-12/5b6b8fb53a596.png',
    noPass: 'demandCustomOrder/attachment/2020-12/5b6b2d66c4bf0.png',
    review: 'demandCustomOrder/attachment/2020-12/5b6b84a2df11a.png',
    errorIcon: 'demandCustomOrder/attachment/2020-12/5b6b801e70ca7.png',
    designerBg: 'demandCustomOrder/attachment/2020-12/5b6b930d19abc.png',
    designerInfoIcon: 'demandCustomOrder/attachment/2020-12/5b6b94b4dde6a.png',
    designerAllWorkIcon: 'demandCustomOrder/attachment/2020-12/5b6b95432b785.png',
    designerOrderIcon: 'demandCustomOrder/attachment/2020-12/5b6b9585c4744.png',
    designerMsgIcon: 'demandCustomOrder/attachment/2020-12/5b6b976070095.png',
    designerWorkIcon: 'demandCustomOrder/attachment/2020-12/5b6b971e454ba.png',
    designerReply: 'demandCustomOrder/attachment/2020-12/5b6f492b181b2.png',
    timeIcon: 'demandCustomOrder/attachment/2020-12/5b7186313ab19.png',
}, keyMap = Object.keys(map), len = keyMap.length; len--;) {
    map[keyMap[len]] = domain + map[keyMap[len]]
}

export default map
