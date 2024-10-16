console.log('1번============= ');
// 1. 배열의 최소값 찾기
// 주어진 배열에서 가장 작은 값을 찾아 반환하는 함수를 작성하세요.
function findMin(arr) {
    // 코드를 작성하세요.

    return Math.min(...arr);
}

console.log('2번============= ');
console.log(findMin([10, 5, 20, 8])); // 5

// 2. 배열에서 특정 값 제거하기
// 주어진 배열에서 특정 값을 제거하는 함수를 작성하세요.
function removeValue(arr, value) {
    // 코드를 작성하세요.
    //arr.pop(value)

    var result = arr.filter(remove);  // true반환된 요소만 배열에 들어감
    
    function remove(num) {
        if(num!=value) {
            return true;  
        }
    }

    return result;
}
console.log(removeValue([1, 2, 3, 4, 2], 2)); // [1, 3, 4]


console.log('3번============= ');
// 3. 2차원 배열의 행 합 구하기
// 2차원 배열에서 각 행의 합을 구하여 새로운 배열로 반환하는 함수를 작성하세요.
function sumRows(matrix) {
    // 코드를 작성하세요.

    var sum = [];

    for (const key in matrix) {
        sum.push(matrix[key][0]+matrix[key][1]);

    }
    return sum;
}
console.log(sumRows([[1, 2], [3, 4], [5, 6]])); // [3, 7, 11]


console.log('4번============= ');
// 4. 배열에서 중복된 요소 찾기
// 주어진 배열에서 중복된 요소들을 찾아 반환하는 함수를 작성하세요.
function findDuplicates(arr) {                                  // 안됨
    // 코드를 작성하세요.
    let duplicates = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          // 중복된 숫자가 발견되면 duplicates에 추가
          if (!duplicates.includes(arr[i])) {
            duplicates.push(arr[i]);
          }
        }
      }
    }
    return duplicates;

}
console.log(findDuplicates([1, 2, 3, 4, 4, 5, 5])); // [4, 5]


