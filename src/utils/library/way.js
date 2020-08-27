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

// 构造树(方法一)
function array1Tree(array) {
    const result = []
    if (!Array.isArray(array)) {
        return result
    }
    array.forEach(item => {
        delete item.children
    })
    const map = {}
    array.forEach(item => {
        map[item.id] = item
    })
    array.forEach(item => {
        const parent = map[item.parentId]
        if (parent) {
            (parent.children || (parent.children = [])).push(item)
        } else {
            result.push(item)
        }
    })
    return result
}

/**
 *通过递归实现
 * data 数组数据
 * pid 顶级元素的parentId值
 */
//方法(二)
const constructTree = (data, pid) => {
    let tree = [];
    let temp;
    for (let i = 0; i < data.length; i++) {
        if (data[i].parentId === pid) {
            let obj = data[i];
            temp = constructTree(data, data[i]._id);
            if (temp.length > 0) {
                obj.children = temp;
            }
            tree.push(obj);
        }
    }
    return tree;
}

// 构造树方法(三)
// 构造树形结构
function constructorTree(groups) {
    const PID = "PID";

    // 创建 父=>子 字典, id=>实体 字段
    let p_cMap = {};
    let i_mMap = {};
    (groups || []).map(group => {
        let pId = group['parentId'] || PID;
        let children = p_cMap[pId] || [];
        children.push(group);
        p_cMap[pId] = children;

        i_mMap['_id'] = group;
    });

    // 构造树结构
    let cFunction = (childrenItems) => {
        return (childrenItems || []).map(item => {
            return {
                title: item['name'],
                value: item['_id'],
                key: item['_id'],
                data: item,
                selectable: item['selectable'],
                repoType: item[`repoType`],
                _id: item['_id'],
                parentId: item[`parentId`],
                children: cFunction(p_cMap[item['_id']] || [])
            }
        })
    };

    return cFunction(p_cMap[PID]);
}

//扁平化树结构
let resultArr = [];
function flat(nodes) {
    if (!nodes || nodes.length === 0) return [];
    nodes.forEach((node) => {
        resultArr.push({...node});
        return flat(node.children);
    });
}