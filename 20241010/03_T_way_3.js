// 1. cityInput 클릭해서, cityListContainer 창 띄우기

const cityInput = document.getElementById('city-input');
const cityListContainer = document.getElementById('city-list-container');

// 2. countryContainer에서 나라 선택해서, cityContainerUls 띄우기
const countryContainer = document.getElementById('country-container');
const countryContainerLies = countryContainer.getElementsByTagName('li');

const cityContainer = document.getElementById('city-container');
const cityContainerUls = cityContainer.getElementsByTagName('ul');

const cityContainerLies = cityContainer.getElementsByTagName('li');


// 2. countryContainer에서 나라 선택해서, cityContainerUls(도시선택 창) 띄우기
for (let i = 0; i < countryContainerLies.length; i++) {
    countryContainerLies[i].addEventListener('click', event => {
        // if(i==0) {
        //     console.log('1. 대한민국 클릭');
        // } else {
        //     console.log('2. 일본 클릭');
        // }
        // 2.1 모든 ul을 일단 안보이게 변경한다
        for (let j = 0; j < cityContainerUls.length; j++) {
            cityContainerUls[j].removeAttribute('active');
            console.log(j,cityContainerUls[j]);
        }
        // 2.2 해당되는 ul만 active 속성을 주어서 나타나게 함
        cityContainerUls[i].setAttribute('active','');
    }, true);
    
}

// 3. 도시를 선택하면, cityInput에 text가 입력되도록
for (let i = 0; i < cityContainerLies.length; i++) {

    cityContainerLies[i].onclick = () => {
        const text = cityContainerLies[i].querySelector('div').innerText;
        cityInput.value = text;
        // // 선택이 끝나면, 나라/도시 선택 창를 지운다 - 안되는 상태
        // cityListContainer.removeAttribute('active');
    }
    
}


// 1. cityInput 클릭해서, cityListContainer 창 띄우기
document.body.onclick = event => {
    cityListContainer.removeAttribute('active');
}

cityInput.onclick = event => {
    // 결국 city-list-container도 body이기에 이벤트 전파를 막아주어야함
    event.stopPropagation(); 
    cityListContainer.setAttribute('active','');
}

// 