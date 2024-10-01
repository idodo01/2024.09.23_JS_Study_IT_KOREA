
// 4. defer 사용하면 이거 안적어도 됨
// window.addEventListener('DOMContentLoaded', () => {}


// 2.
const imgTag = document.querySelector('img');
const textArea = document.querySelector('textarea');

    // (안됨)
imgTag.onload = () => {
    console.log("이미지 로드");
}

textArea.onclick = () => {
    console.log("에리어선택");
}

// 포커스되었을 때
textArea.onfocus = () => {
    console.log("에리어포커스됨");
}

// 포커스 해제되었을 때
textArea.onblur = () => {
    console.log("에리어 블러됨");
}

window.onscroll = () => {
    console.log("스크롤 중...");
}