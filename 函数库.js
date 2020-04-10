// 包含es6的语法

// 查找规则:

// 1.深拷贝 --- deepClone

// 2.生成随机字符串 --- randomString

// 3.添加千位分隔符/去除千位分隔符 --- addThousandth/removeThousandth

// 4.数组操作相关方法 ---  数组排序类:   es6数组排序:sortByArr  es6数组对象排序:sortByKey  冒泡排序:bubbleSort
//                  ---   数组去重类:   es6数组去重:unique   数组去重:uniq   数组对象去重:removeObjDuplication


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

// 生成随机字符串
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

// 添加千位分隔符
function addThousandth(value) {
    let t= value >=1000 ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value;
    return t
}

// 去除千位分隔符
function removeThousandth(value) {
    return value.replace(/(,*)/g, '')
}


// 数组排序(es6)
function sortByArr(arr) {
    return arr.sort(function(a,b){
        return a - b;
    });
}

// 数组对象方法排序(es6)
function sortByKey(arr,key){
    return arr.sort(function(a,b){
        let x=a[key];
        let y=b[key];
        return x - y;
    });
}

// 冒泡排序
function bubbleSort(arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        let bool = true;
        for(let j = 0; j < arr.length - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                bool = false;
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        if(bool) {
            break
        }
    }
    return arr
}

// 数组去重(es6): 无法去重“{}”空对象
function unique(arr) {
    return Array.from(new Set(arr))
}

// 数组去重
function uniq(arr) {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        if (temp.indexOf(arr[i]) === -1) {
            temp.push(arr[i]);
        }
    }
    return temp;
}

// 数组对象去重(key为对象中的某个键值)
function removeObjDuplication(arr, key) {
    let result = [];
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i][key]]) {
            result.push(arr[i]);
            obj[arr[i][key]] = true;
        }
    }
    return result
}