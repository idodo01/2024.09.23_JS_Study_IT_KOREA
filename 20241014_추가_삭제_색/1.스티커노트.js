const stickerContainer = document.getElementById('sticker-container');

// 노트 객체. 하나의 노트 자체를 의미하며 그 노트의 기능들을 가짐
class StickerNote{
    constructor(){
        this.html = `
        <nav class="top-bar">
            <button type="button" class="add"><i class="bi bi-plus-lg"></i></button>
            <div>
                <button type="button" class="save"><i class="bi bi-floppy"></i></button>
                <button type="button" class="list"><i class="bi bi-list-ul"></i></button>
                <button type="button" class="delete"><i class="bi bi-x-lg"></i></button>
            </div>
        </nav>
        <textarea></textarea>
        <nav class="side-bar">
            <ul class="color-list"></ul>
            <ul class="note-list"></ul>
        </nav>`;
        // this.note == 내가 만든 새로운 노트
        this.note = document.createElement('section');
        this.note.className = 'sticker-note';
        this.note.insertAdjacentHTML('beforeend', this.html);
        stickerContainer.appendChild(this.note);
        // 이 노트가 가진 기능들을 한번씩 실행하면서, 노트에 있는 이벤트 효력을 발생시킨다
        this.add_note();
        this.delete_note();
        this.toggle_note_list();
        this.save_note();
        this.change_color();
        this.move_note();
    }
    // 새 노트 추가 기능
    add_note(){
        const addButton = this.note.querySelector('.add');
        addButton.onclick = () => {
            new StickerNote();
        }
    }
    // 노트 삭제 기능
    delete_note(){
        const deleteButton = this.note.querySelector('.delete');
        deleteButton.onclick = () => {
            const note = stickerContainer.querySelectorAll('.sticker-note');
            // 남은 노트가 하나다.
            if(note.length === 1){
                alert('노트는 하나 이상 존재해야 합니다!');
                return;
            }
            // 삭제할때는 물어보고 삭제하기
            if(confirm('정말 삭제하시겠습니까?')){
                this.note.remove();
            }
        }
    }
    // 목록 보기/숨기기 기능
    toggle_note_list(){
        const listButton = this.note.querySelector('.list');
        // 목록 보기/숨기기 버튼 클릭 시
        listButton.onclick = () => {
            // 사이드 바를 가져와서
            const sideBar = this.note.querySelector('.side-bar');
            // active 속성이 false라는 것은 닫혀있는 상태
            // 닫힌 상태에서 열 때만 해라
            if(!sideBar.hasAttribute('active')){
                // 사이드 바에 있는 모든 li들을 재구성하기 위해 ul의 li를 전부 제거한다
                const sideBarUl = sideBar.querySelector('.note-list');
                sideBarUl.innerHTML = '';
                // 로컬 스토리지에 저장된 모든 노트를 전부 가져온다
                for(let i = 0; i < localStorage.length; i++){
                    const key = localStorage.key(i);
                    const li = document.createElement('li'); // li를 하나 생성한다
                    li.textContent = key; // li 내부 글자를 key 값 (노트 제목) 으로 변경한다        
                    sideBarUl.appendChild(li); // ul에 li를 집어넣는다
        
                    //// 노트 내용 불러오기
                    // 생성된 li를 클릭했을 때 => localStorage에서 내용 불러와서 textarea 내용으로 변경
                    li.onclick = () => {
                        if(confirm('노트 내용을 변경하시겠습니까?')){
                            const key = li.textContent; // 노트 제목을 가져온다 (key 값)
                            const object = JSON.parse( localStorage.getItem(key) ); // 노트의 내용을 가져온다 (key값을 통해)
                            // 현재 노트의 내용을 가져온 내용으로 변경한다
                            this.note.querySelector('.top-bar').style.backgroundColor = object.topBarColor;
                            this.note.querySelector('textarea').style.backgroundColor = object.textareaColor;
                            this.note.querySelector('textarea').value = object.content;
                            // active 속성을 삭제 시킴 (사이드바를 접음)
                            sideBar.removeAttribute('active');
                        }
                    }
                }
            }
            // active 속성을 toggle 시킴
            sideBar.toggleAttribute('active');
        }
    }
    // 노트 내용 저장하기 기능
    save_note(){
        //// 노트 내용 저장하기
        const saveButton = this.note.querySelector('.save');
        saveButton.onclick = () => {
            const title = prompt('메모의 제목을 작성하세요');
            // 취소를 눌렀다면
            if(title === null){
                return;
            }
            // 제목을 입력하지 않았다면
            if(title.trim() === ''){
                alert('제목은 필수 값 입니다!');
                return;
            }

            const topBarColor = getComputedStyle(this.note.querySelector('.top-bar')).backgroundColor;
            const textareaColor = getComputedStyle(this.note.querySelector('textarea')).backgroundColor;
            const content = this.note.querySelector('textarea').value;
            const object = {
                topBarColor: topBarColor,
                textareaColor: textareaColor,
                content: content
            };
            localStorage.setItem(title, JSON.stringify(object) );
            alert('저장이 완료되었습니다!');
        }
    }
    change_color(){
        const colorList = [
            ['#183770', '#183770AA'], 
            ['#3A68BD', '#3A68BDAA'], 
            ['#BD973C', '#BD973CAA'], 
            ['#FFF044', '#FFF044AA'], 
            ['#F9F1DE', '#F9F1DEAA']
        ];
        const colorListUl = this.note.querySelector('.color-list');
        for(let i = 0; i < colorList.length; i++){
            const colorLi = document.createElement('li');
            colorLi.style.backgroundColor = colorList[i][0];
            colorListUl.appendChild(colorLi);
            colorLi.onclick = () => {
                this.note.querySelector('.top-bar').style.backgroundColor = colorList[i][0];
                this.note.querySelector('textarea').style.backgroundColor = colorList[i][1];
            }
        }
    }

    // 노트 이동시키기 기능
    move_note(){
        const topBar = this.note.querySelector('.top-bar');
        topBar.onmousedown = event => {
            // 내가 클릭한 위치 - 노트의 왼쪽 (x축) 위치 == 노트로부터 얼만큼 띄워진 곳을 클릭했는가
            // 내가 클릭한 위치 - 노트의 위쪽 (y축) 위치 == 노트로부터 얼만큼 띄워진 곳을 클릭했는가
            const shiftX = event.clientX - topBar.getBoundingClientRect().left;
            const shiftY = event.clientY - topBar.getBoundingClientRect().top;
            
            // 마우스를 떼면
            topBar.onmouseup = () => {
                // 마우스 움직임 이벤트(드래그 이벤트) 를 취소시킨다
                stickerContainer.onmousemove = null;
                topBar.onmouseup = null;
            }
        
            // 드래그 시킨다
            stickerContainer.onmousemove = event => {
                this.note.style.left = event.pageX - shiftX + 'px';
                this.note.style.top = event.pageY - shiftY + 'px';
            }
        }
    }
}
// 최초의 노트를 생성한다
const firstNote = new StickerNote();










