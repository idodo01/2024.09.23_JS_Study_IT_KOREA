const gameStartInfoH3 = document.querySelector('h3');

const gameTimeSpan = document.querySelector('.time');
const gameLevelSpan = document.querySelector('.level');

const colorButtonContainer = document.querySelector('.color-button-container');


let level = 1; // 처음 레벨 숫자
let rowAndColumn = 2; // 가로 세로 개수

const gameClearTime = 10.0; // 게임 진행 설정 시간 (초) // 설정용 변수
let gameCurrentTime = gameClearTime; // 현재 게임 흘러간 시간 (초) // 실제 사용 변수
let intervalId = null;

function reset_time(){

    // 이미 게임 진행중이었다면
    if(intervalId !== null){
        // 진행중이던 초읽기를 중단한다
        clearInterval(intervalId);

        // 시간 초기화, 다시 10초로
        gameCurrentTime = gameClearTime;
        
        // .toFixed(1) : 소수점 첫번째 자리까지 표시
        gameTimeSpan.textContent = gameCurrentTime.toFixed(1);
    }

    // 0.1초마다 0.1초씩 시간을 줄인다
    intervalId = setInterval(() => {
        gameCurrentTime -= 0.1; // 0.1초씩 시간 감소

        // 시간이 5초 이하라면
        if(gameCurrentTime <= 5){
            gameTimeSpan.style.color = 'red';
            gameTimeSpan.style.fontWeight = 'bold';
        }


        // 소수점은 0이랑 같아질 수가 없기 때문에, 
        // 이렇게 쓰면 작동안된다
        // if(gameCurrentTime === 0){  

        // 시간이 0초 보다 적게 남았다면 === 게임 오버
        if(gameCurrentTime <= 0){ 
            clearInterval(intervalId);  // 진행중이던 초읽기를 중단한다
            intervalId = null; // 게임이 끝난 후 다시 게임 시작할 때, null 값일 때만 가능하기에
            
            alert('게임 오버!');

            gameCurrentTime = gameClearTime;
            colorButtonContainer.innerHTML = ''; // 생성되어있는 모든 버튼 지우기
            gameStartInfoH3.style.visibility = 'visible'; // 재시작 문구 보여주기
        }
        gameTimeSpan.textContent = gameCurrentTime.toFixed(1);
    }, 100); // 1000이 1초, 100은 0.1초
}

// 스페이스 바를 누르면 시작
document.onkeydown = event => {
    // 누른 키가 Space bar 라면, 그리고 게임이 진행중이 아니라면
    // intervalId === null 안하면, 게임 중에 스페이스바 누르면 다시 시작되어버림
    if(event.key === ' ' && intervalId === null){
        gameStartInfoH3.style.visibility = 'hidden'; // 재시작 문구 안보이게 하기
        // 안보이게 하는 방법 1 (but, 하면 없어졌을 때, 레이아웃 영향을  줌)
        // gameStartInfoH3.style.display = 'none'; 
        // 안보이게 하는 방법 2 (but, 눈에만 안보이는거라 드래그됨)
        // gameStartInfoH3.style.opacity = '0'; 
        create_level(); // 최초 한번, 레벨을 생성한다
        reset_time(); // 시간을 진행시킨다
    }
}

// 새로운 게임 레벨을 생성한다
function create_level(){
    // 레벨 숫자 값을 재설정한다
    gameLevelSpan.textContent = level;
    // 생성되어있는 모든 버튼을 제거한다
    colorButtonContainer.innerHTML = '';

    colorButtonContainer.style.gridTemplateColumns = `repeat(${rowAndColumn}, 1fr)`;
    colorButtonContainer.style.gridTemplateRows = `repeat(${rowAndColumn}, 1fr)`;

    // 랜덤한 r, g, b 값을 정한다
    const r = Math.floor(Math.random() * 256); // 0 ~ 255까지 랜덤 숫자
    const g = Math.floor(Math.random() * 256); // 0 ~ 255까지 랜덤 숫자
    const b = Math.floor(Math.random() * 256); // 0 ~ 255까지 랜덤 숫자
    
    // 1. 버튼을 rowAndColumn * rowAndColumn 개수만큼 생성합니다
    for(let i = 0; i < rowAndColumn * rowAndColumn; i++){
        // 버튼만들기
        const button = document.createElement('button');
        button.type = 'button';
        button.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // colorButtonContainer에 버튼 삽입하기
        colorButtonContainer.appendChild(button);
        // 버튼을 클릭했다 === 정답이 틀렸다
        button.onclick = () => {
    
        }
    }
    
    // 2. 색이 다른 버튼 하나 만들어주기
    // 모든 버튼을 가져오면서 랜덤한 숫자(index)를 하나 고릅니다
    const randomIndex = Math.floor(Math.random() * rowAndColumn * rowAndColumn); // 0 ~ 3까지 랜덤 숫자
    const allButton = colorButtonContainer.getElementsByTagName('button');
    // 그 중 하나의 랜덤한 버튼을 골라서, rgb 값을 재설정해줍니다(연하게 설정)
    allButton[randomIndex].style.backgroundColor = `rgb(${r}, ${g}, ${b}, 0.8)`;

    // 뽑은 하나의 버튼을 클릭했다 === 정답을 클릭했다
    allButton[randomIndex].onclick = () => {
        // 레벨 값을 1 증가시킨다
        level++; 
        // row와 column 개수를 1씩 증가시킨다
        rowAndColumn++;

        // 새로운 게임 시작!
        create_level();
        // 초읽기를 재시작한다
        reset_time();
    }
}
