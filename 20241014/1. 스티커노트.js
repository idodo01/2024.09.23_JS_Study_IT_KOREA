class StickerNote {
    constructur() {
        this.html = `
            <section id="sticker-container">
                <section class="sticker-note">
                    <nav class="top-bar">
                        <button type="button" classs="aad"><i class="bi bi-plus-lg"></i></button>
                        <div>
                            <button type="button" classs="save"><i class="bi bi-floppy2-fill"></i></button>
                            <button type="button" classs="list"><i class="bi bi-list-ul"></i></button>
                            <button type="button" classs="delete"><i class="bi bi-trash3"></i></button>    
                        </div>
                    </nav>
                    <textarea>


                    </textarea>

                    <nav class="side-bar">
                        <ul>
                            <li>11111111111111111111111111111</li>
                            <li>222222222222222222</li>
                            <li>22333333333333333</li>
                            <li>3334444444444444444444</li>
                            <li>11111111111111111111111111111</li>
                            <li>222222222222222222</li>
                            <li>22333333333333333</li>
                            <li>3334444444444444444444</li>
                        </ul>
                    </nav>
                </section>
            </section>
        
        `;
    }
}

// const firstNote = new StickerNote;

/*********************************************** */

const stickerContainer = document.querySelector('#sticker-container');
const stickerNote = document.querySelector('.sticker-note');
const listButton = document.querySelector('.list');

listButton.onclick =  () => {
    // 사이드 바를 가져와서
    const sideBar = stickerNote.querySelector('.side-bar');

    // // list가 닫혀있다면, 열때만
    // if(!sideBar.toggleAttribute==active) {

    // }


    // 사이드바 ul의 내용을 초기화하고
    const sideBarUl = sideBar.querySelector('ul');
    sideBarUl.innerHTML = '';

    //로컬 스토리지에 저장된 모든 노트를 전부 가져온다
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const li = document.createElement('li');
        li.textContent = key;
        sideBarUl.appendChild(li);

        // 노트 내용 불러오기
        li.onclick = () => {
            if(confirm('노트의 내용을 바꾸시겠습니까?')) {
                const key = li.textContent // 노트의 제목을 가져온다
                const content = localStorage.getItem(key); // 노트의 내용을 가져온다
                stickerNote.querySelector('textArea').value = content;

                // active 속성을 삭제시킴 (사이드바를 접는다)
                sideBar.removeAttribute('active');
            }
       
        }
    }

    
    

    // active 속성을 toggle시킴 (list를 연다)
    sideBar.toggleAttribute('active');
};



// 노트 값 저장하기
const saveButton = stickerNote.querySelector('.save');
saveButton.onclick =  () => {
    
    const title = prompt('제목을 입력하세요');
    // 취소를 눌렀다면
    if (title === null) {
        return
    }
    // 제목을 입력하지 않았다면
    if(title.trim() === '') {
        alert('제목값은 필수입니다');
        return;
    }
    const textArea= stickerNote.querySelector('textarea');
    localStorage.setItem(title, textArea.value);
    alert('저장이 완료되었습니다.');
};


/********************************** */

// 노트 움직이기

const topBar = stickerNote.querySelector('.top-bar');
console.log(topBar);
topBar.onmousedown = event => {
    console.log('클릭됨');
    // 내가 클릭한 위치 - 노트의 왼쪽 꼭지점 위치 : 노트로부터 얼마나 띄어진 곳을 클릭했는가
    const shiftX = event.clientX - stickerNote.getBoundingClientRect().left;
    const shiftY = event.clientY - stickerNote.getBoundingClientRect().top;
   
     // 마우스를 떼면
     topBar.onmouseup = () => {
        // 마우스 움직임 이벤트를 취소시킨다
        console.log('취소됨');
        stickerContainer.onmousemove = null;
        topBar.onmouseup = null;
    }

    // 드래그 시킨다
    stickerContainer.onmousemove = event => {
        console.log('드래그됨');
        stickerNote.style.left = event.pageX - shiftX + 'px';
        stickerNote.style.top = event.pageY - shiftY + 'px';

       
    }

    

}
