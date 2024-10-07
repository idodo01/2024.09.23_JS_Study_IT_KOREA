const [gameOverBtn, rakingBtn] = document.getElementsByTagName('button');
const modalContainer = document.querySelector('.modal-container');
const gameScoreH3 = document.getElementById('game-score');
const confirmBtn = document.getElementById('confirm');
const nickNameInput = document.getElementById('nickname');
const tableBody = document.querySelector('tbody');

// 배열
// var persons = [ ['사람1', 1000], ['사람10', 1000], ['사람3', 700], ['사람2', 500] ]
// 객체
var persons = { 
    1: {
        '사람1': 1000, 
        '사람10': 1000
    }, 
    4: {'사람4': 100}, 
    2: ['사람3', 700], 
    3: ['사람2', 500] 
};




// 처음 화면 왔을 때 최초 한번 실행
view_rank();

// 랭킹을 표시하기
function view_rank(){
    // tbody에 있는 모든 값을 제거하고 
    tableBody.innerHTML = '';
    // localStorage에 있는 모든 key 값 가져오기

    const persons = [];
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        // 해당 사람 정보를 배열에 넣는다
        persons.push({ nickname: key, score: value });
    }

    persons.sort( (v1, v2) => v2.score - v1.score );

    let rank = 0;
    let personScore = 0;
    for(const person of persons){
        // 그 전 사람과 스코어가 다르다
        if(person.score !== personScore){
            rank++; // 난 다음 랭크이다
        }
        person.rank = rank;
        personScore = person.score;
    }

    for(const person of persons){
        //tbody에 한 줄 추가한다
        tableBody.insertAdjacentHTML('beforeend', 
            `<tr>
                <td>${person.rank}</td>
                <td>${person.nickname}</td>
                <td>${person.score}</td>
            </tr>`
        );
    }

    console.log(persons);
}

rakingBtn.onclick = view_rank;

// 모달을 덮는 전체 창을 클릭했을 시
modalContainer.onclick = event => {
    if(event.target !== modalContainer){
        return;
    }
    // 모달창 안보이게 하기
    modalContainer.removeAttribute('active');
}

// 게임오버 버튼 클릭 시 
gameOverBtn.onclick = () => {
    // 모달창 보이게 하기
    modalContainer.setAttribute('active', '');
    // 0000.0000000 ~ 999.9999999999999
    const randomScore = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    gameScoreH3.textContent = randomScore;
}

confirmBtn.onclick = () => {
    const gameScore = gameScoreH3.textContent;
    const nickName = nickNameInput.value;
    // nickNameInput에 적힌 글자를 없애기
    nickNameInput.value = '';
    // 닉네임을 입력하지 않았다면 닉네임을 입력하도록 유도
    if(nickName.trim() === ''){
        alert('닉네임을 입력하세요');
        return;
    }
    // {닉네임: 스코어} 로 저장하기
    localStorage.setItem(nickName, gameScore);
    alert('랭킹에 등록되었습니다!');
    // 모달창 안보이게 하기
    modalContainer.removeAttribute('active');
    // 랭킹 다시 만들기
    view_rank();
}




