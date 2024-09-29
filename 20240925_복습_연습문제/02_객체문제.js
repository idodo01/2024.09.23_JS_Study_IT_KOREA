console.log('1번============= ');
// 1. 객체의 키-값 쌍 거꾸로 만들기
// 객체의 키와 값을 서로 바꾼 새로운 객체를 반환하는 함수를 작성하세요.
function invertObject(obj) {
    // 코드를 작성하세요.
    var newObj = {}
    
    for (let i in obj) {
        newObj[obj[i]] = i // newObj.obj[i] // 이렇게 안됨
        // console.log('프로퍼티 명:',i,'프로퍼티 값:',obj[i]);
        
    }
    return newObj
}
console.log(invertObject({ a: 1, b: 2, c: 3 })); // { 1: "a", 2: "b", 3: "c" }

console.log('2번============= ');
// 2. 객체에서 키가 특정 값인 항목 찾기
// 객체 배열에서 주어진 키의 값이 특정 값과 일치하는 첫 번째 객체를 반환하는 함수를 작성하세요.
function findObjectByKey(arr, key, value) {
    // 코드를 작성하세요.
    for (let index = 0; index < arr.length; index++) {
        if(arr[index][key] == value) {
            return arr[index];
            
        }

        
    }
    // return arr[0].id;
    
}
const objects = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];

console.log(findObjectByKey(objects, 'id', 2)); // { id: 2, name: "Jane" }


console.log('3번============= ');
// 3. 객체 합치기
// 두 개의 객체를 합쳐서 반환하는 함수를 작성하세요. 
// 같은 키를 가지는 경우 두 번째 객체의 값을 우선합니다.
function mergeObjects(obj1, obj2) {
    // newObj = {};
    // // 코드를 작성하세요.
    // for (const key in obj1) {
    //     newObj[key] = obj1[key];
    //     for (const key2 in obj2) {
            
    //         if(key == key2) {
    //             newObj[key] = obj2[key]
    //         }
    //         // if(key2 in obj1) {       c 추가하는 거
    //         //     newObj[key] = obj2[key]
    //         // }
            
    //         //return key+obj1[key];
    //     }
    // }
    // return newObj;
    return {...obj1,...obj2}; 
    //return Object.keys(obj1)[0];
    //return obj1.a;
}
console.log(mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 })); // { a: 1, b: 3, c: 4 }


console.log('4번============= ');
// 4. 객체에서 특정 키만 추출하기
// 객체에서 특정 키들만 추출하여 새로운 객체를 반환하는 함수를 작성하세요.
function pick(obj, keys) {
    // 코드를 작성하세요.
    // return obj[keys[0]]; //1
    // return keys[0]; // 'a'
    var newObj = [];

    for (const key in obj) {
       if(keys.includes(key)) {// keys 안에 a,b,c 가  있니
        newObj[key] = obj[key];
       }

    }
            
    return newObj;

      
}
console.log(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])); // { a: 1, c: 3 }


console.log('5번============= ');
// 5. 객체 배열에서 키 값의 총합 구하기
// 객체 배열에서 특정 키의 값들의 합을 구하는 함수를 작성하세요.
function sumByKey(arr, key) {
    // 코드를 작성하세요.

    var sum = 0;

    
    for (const arrKey in arr) {
        sum += +arr[arrKey][key];
        
    }
    return sum;
}
const data = [{ value: 10 }, { value: 20 }, { value: 30 }];
console.log(sumByKey(data, 'value')); // 60