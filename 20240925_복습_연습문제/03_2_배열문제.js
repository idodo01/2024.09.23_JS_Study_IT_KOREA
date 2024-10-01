// 1. 배열의 최소값 찾기

// 주어진 배열에서 가장 작은 값을 찾아 반환하는 함수를 작성하세요.

function findMin(arr) {

    return Math.min(...arr);

}

//console.log(findMin([10, 5, 20, 8])); // 5

// 2. 배열에서 특정 값 제거하기

// 주어진 배열에서 특정 값을 제거하는 함수를 작성하세요.

function removeValue(arr, value) {

    let index = arr.indexOf(value);

    while(index !== -1){

        arr.splice(index, 1);

        index = arr.indexOf(value);

    }

    return arr;

}

console.log(removeValue([1, 2, 3, 4, 2], 2)); // [1, 3, 4]

// 3. 2차원 배열의 행 합 구하기

// 2차원 배열에서 각 행의 합을 구하여 새로운 배열로 반환하는 함수를 작성하세요.

function sumRows(matrix) {

    return matrix.map(arr => arr.reduce((prev,curt) => prev + curt));

    // const arr = [];

    // for(let i = 0; i < matrix.length; i++){

    //     const sum = matrix[i].reduce((prev,curt) => prev + curt);

    //     arr.push(sum);

    // }

    // return arr;

}

console.log(sumRows([[1, 2], [3, 4], [5, 6]])); // [3, 7, 11]

// 5. 배열에서 중복된 요소 찾기

// 주어진 배열에서 중복된 요소들을 찾아 반환하는 함수를 작성하세요.

function findDuplicates(arr) {

    let result = [];

    for(let i = 0; i < arr.length; i++){

        // 정답 배열에 현재 데이터가 없다면

        if(!result.includes(arr[i])){

            // 이 데이터가 원래 배열에서 중복인지 확인한 후

            if(arr.indexOf(arr[i], i + 1) !== -1){

                result.push(arr[i]); // 중복 데이터를 정답배열에 추가

            }

        }

    }

    return result;

}

console.log(findDuplicates([1, 2, 3, 4, 4, 5, 5])); // [4, 5]
