const gameStartInfoH3 = document.querySelector('h3');
const gameTimeSpan = document.querySelector('.time');
const gameLevelSpan = document.querySelector('.level');
const colorButtonContainer = document.querySelector('.color-button-container');

let level = 1; // 처음 레벨 숫자
let rowAndColumn = 2; // 가로 세로 개수
const gameClearTime = 10.0; // 게임 진행 설정 시간 (초)
let gameCurrentTime = gameClearTime; // 현재 게임 흘러간 시간 (초)
let intervalId = null;

function reset_time(){
    // 이미 진행중이던 초읽기가 있다면
    if(intervalId !== null){
        // 진행중이던 초읽기를 중단한다
        clearInterval(intervalId);
        // 다시 10초로 변경
        gameCurrentTime = gameClearTime;
        // 10초 문자를 다시 설정
        gameTimeSpan.textContent = gameCurrentTime.toFixed(1);
    }

    // 0.1초마다 0.1초씩 시간을 줄인다
    intervalId = setInterval(() => {
        gameCurrentTime -= 0.1;
        if(gameCurrentTime <= 5){
            gameTimeSpan.style.color = 'red';
            gameTimeSpan.style.fontWeight = 'bold';
        }
        // 시간이 0초 보다 적게 남았다면 === 게임 오버
        if(gameCurrentTime <= 0){
            clearInterval(intervalId);
            intervalId = null;
            alert('게임 오버!');
            gameCurrentTime = gameClearTime;
            colorButtonContainer.innerHTML = ''; // 생성되어있는 모든 버튼 클릭
            gameStartInfoH3.style.visibility = 'visible'; // 재시작 문구 보여주기
        }
        gameTimeSpan.textContent = gameCurrentTime.toFixed(1);
    }, 100);
}

document.onkeydown = event => {
    // 누른 키가 Space bar 라면, 그리고 게임이 진행중이 아니라면
    if(event.key === ' ' && intervalId === null){
        gameStartInfoH3.style.visibility = 'hidden'; // 다시 시작 문구 안보이게 하기
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
    
    // 버튼을 rowAndColumn * rowAndColumn 개수만큼 생성합니다
    for(let i = 0; i < rowAndColumn * rowAndColumn; i++){
        const button = document.createElement('button');
        button.type = 'button';
        button.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        colorButtonContainer.appendChild(button);
        // 버튼을 클릭했다 === 정답이 틀렸다
        button.onclick = () => {
    
        }
    }
    
    // 모든 버튼을 가져오면서 랜덤한 숫자(index)를 하나 고릅니다
    const randomIndex = Math.floor(Math.random() * rowAndColumn * rowAndColumn); // 0 ~ 3까지 랜덤 숫자
    const allButton = colorButtonContainer.getElementsByTagName('button');
    // 그 중 하나의 랜덤한 버튼을 골라서, rgb 값을 재설정해줍니다(연하게 설정)
    allButton[randomIndex].style.backgroundColor = `rgb(${r}, ${g}, ${b}, 0.8)`;

    // 뽑은 하나의 버튼을 클릭했다 === 정답을 클릭했다
    allButton[randomIndex].onclick = () => {
        level++; // 레벨 값을 1 증가시킨다
        // row와 column 개수를 1씩 증가시킨다
        rowAndColumn++;
        // 새로운 레벨을 생성한다
        create_level();
        // 초읽기를 재시작한다
        reset_time();
    }
}
