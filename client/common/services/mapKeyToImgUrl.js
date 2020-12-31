
for (var map = {
    service_icon: 'static/images/index/guarantee.png',
    eye_icon: 'static/images/index/eye.png',
    news_default_ablum: 'static/images/public/logo-seat.jpg',
    right_arrow: 'static/images/public/right-arrow.png',
    heart_icon: 'static/images/product/collection.png',
    check_mark: 'static/images/product/check-mark.png',
    close_icon: 'static/images/public/close.png',
    cart_icon: 'static/images/product/cart.png',
    customer_service: 'static/images/product/customer-server.png',
    check_icon: 'static/images/cart/check-icon.png',
    errorImg: 'static/images/errorImg.jpg',
    couponBar: 'static/images/product/coupon-bar.png',
    header_icon: 'static/images/header-icon.png',
    center_user: 'static/images/member/center_user.jpg',
    empty_icon: 'static/images/member/collection/empty-icon.png',
    order_border: 'static/images/order/border.jpg',
    coupon_bar: 'static/images/cart/coupon-bar.png',
}, keyMap = Object.keys(map), len = keyMap.length; len--;) {
    map[keyMap[len]] = 'http://m.baoyuyoujia.com/' + map[keyMap[len]]
}

export default map
