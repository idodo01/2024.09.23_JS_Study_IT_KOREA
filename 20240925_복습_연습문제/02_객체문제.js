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

// 2. 객체에서 키가 특정 값인 항목 찾기
// 객체 배열에서 주어진 키의 값이 특정 값과 일치하는 첫 번째 객체를 반환하는 함수를 작성하세요.
function findObjectByKey(arr, key, value) {
    // 코드를 작성하세요.
}
const objects = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];
console.log(findObjectByKey(objects, 'id', 2)); // { id: 2, name: "Jane" }

// 3. 객체 합치기
// 두 개의 객체를 합쳐서 반환하는 함수를 작성하세요. 같은 키를 가지는 경우 두 번째 객체의 값을 우선합니다.
function mergeObjects(obj1, obj2) {
    // 코드를 작성하세요.
}
console.log(mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 })); // { a: 1, b: 3, c: 4 }

// 4. 객체에서 특정 키만 추출하기
// 객체에서 특정 키들만 추출하여 새로운 객체를 반환하는 함수를 작성하세요.
function pick(obj, keys) {
    // 코드를 작성하세요.
}
console.log(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])); // { a: 1, c: 3 }

// 5. 객체 배열에서 키 값의 총합 구하기
// 객체 배열에서 특정 키의 값들의 합을 구하는 함수를 작성하세요.
function sumByKey(arr, key) {
    // 코드를 작성하세요.
}
const data = [{ value: 10 }, { value: 20 }, { value: 30 }];
console.log(sumByKey(data, 'value')); // 60