const subjectH2 = document.querySelector('h2');
const answerSheet = document.getElementById('answer-sheet');
const answerSpans = answerSheet.getElementsByTagName('span');
const alphabetSheet = document.getElementById('alphabet-sheet');

const subjects = ['과일', '가구', '컴퓨터'];
const answers = {
    '과일': ['apple', 'orange', 'melon'],
    '가구': ['desk', 'chair'],
    '컴퓨터': ['cpu', 'monitor', 'mouse', 'graphic']
};
// 주제들 중 랜덤 index 고르기
const randomSubjectIndex = Math.floor(Math.random() * subjects.length);
// 주제 중 랜덤 주제 고르기
const randomSubject = subjects[randomSubjectIndex];
// 해당 주제에 맞는 정답 리스트를 가져옴
const answerList = answers[randomSubject];
// 정답 리스트에서 랜덤한 Index를 고름
const randomAnswerIndex = Math.floor(Math.random() * answerList.length);
// 최종적으로 랜덤한 정답을 가져옴
const randomAnswer = answerList[randomAnswerIndex];

// 주제명을 랜덤으로 고른 주제로 변경한다
subjectH2.textContent = randomSubject;

// 정답 Span을 생성한다
for(let i = 0; i < randomAnswer.length; i++){
    const span = document.createElement('span');
    answerSheet.appendChild(span);
}

// 알파벳 버튼을 생성한다
for(let i = 65; i <= 90; i++){
    const button = document.createElement('button');
    button.textContent = String.fromCharCode(i);
    alphabetSheet.appendChild(button);

    button.onclick = () => {
        const buttonText = button.textContent;
        for(let i = 0; i < randomAnswer.length; i++){
            const alphabet = randomAnswer[i];
            if(buttonText.toUpperCase() === alphabet.toUpperCase()){
                answerSpans[i].textContent = buttonText.toUpperCase();
            }
        }
        button.remove();
    }
}





