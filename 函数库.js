// 包含es6的语法

// 查找规则:
// 1.深拷贝某个对象或数组 --- 深拷贝 - deepClone

// 2.生成随机字符串(例如:ID) --- 生成随机字符串 - randomString


// 深拷贝
function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                // 判断ojb子元素是否为对象，如果是，递归复制
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    // 如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

//生成随机字符串
function randomString(len) {
    len = len || 16;
    let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}