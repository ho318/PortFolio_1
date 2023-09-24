// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ header ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.addEventListener("click", (e) => {
  e.preventDefault();

  btnCall.classList.toggle("on");
  menuMo.classList.toggle("on");
});


// ㅡㅡㅡㅡㅡㅡㅡ main ㅡㅡㅡㅡㅡㅡㅡ
const frame = document.querySelector(".main");
const panels = frame.querySelectorAll(".panel li");

// 패널의 길이 계산 및 변수 초기화
const len = panels.length - 1; // 패널의 개수를 계산 (0부터 시작하는 인덱스를 고려해 1을 뺌.)
let num = 0; // 현재 활성화된 패널의 인덱스를 추적하는 변수 초기화
const interval = 5000; // 롤링 시간 5초로 설정
let timeoutId = null; // 타임아웃ID 변수 초기화

// 롤링 효과 시작
startRolling();

// 롤링 효과를 시작하는 함수
function startRolling() {
  active(num); // 액티브함수를 호출해 초기패널 활성화
  setTimeout(rolling, interval); // 일정 간격 후 롤링함수 호출을 위해 타임아웃 설정
}

// on클래스로 활성화
function active(index) {
  for (let el of panels) {
    el.classList.remove("on");
  }
  panels[index].classList.add("on");
  num = index;
}

// 롤링 
function rolling() {
  if (num < len) {
    num++; // 마지막 패널이 아니면 패널 인덱스 추가
  } else {
    num = 0; // 마지막 패널이면 첫번째로 돌려보냄
  }
  active(num); // 다음패널 활성화를 위해 액티브 함수 호출
  timeoutId = setTimeout(rolling, interval); // 새로운 타임아웃을 설정하여 롤링효과 유지
}





// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ ADVERTISE ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const bannerUl = document.querySelector(".ADVERTISE ul");
const banners = bannerUl.children;
const lis = bannerUl.querySelectorAll("li");
const count = 3;

const btnsAdvertise = document.querySelector(".btns");
const [prev, next] = btnsAdvertise.children; // 배열로 가져옴
const popup = document.querySelector(".popup");
const opens = bannerUl.querySelectorAll("a");

// 초기 배너 위치 조정
for (let i = 0; i < count; i++) {
  bannerUl.prepend(bannerUl.lastElementChild);
}

// 배너 이전 버튼 클릭 이벤트 핸들러
prev.addEventListener("click", () => {
  bannerUl.prepend(bannerUl.lastElementChild);
  setActiveBanner(3);
});

// 배너 다음 버튼 클릭 이벤트 핸들러
next.addEventListener("click", () => {
  bannerUl.append(bannerUl.firstElementChild);
  setActiveBanner(3);
});

// 배너 열기 버튼 클릭 이벤트 핸들러 등록
opens.forEach((el) => {
  el.addEventListener("click", handleBannerOpen);
});

// 배너 활성화 함수
function setActiveBanner(index) {
  for (let el of banners) el.classList.remove("on");
  banners[index].classList.add("on");
}

// 배너 열기 이벤트 핸들러
function handleBannerOpen(e) {
  e.preventDefault();

  const title = e.currentTarget.closest("li").querySelector("h2").innerText;
  popup.querySelector("h2").innerText = title;
  popup.classList.add("on");
  e.currentTarget.classList.add("off");
  btnsAdvertise.classList.add("off");
}




// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ youtube ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

const vidList = document.querySelector(".vidList");
const apiKey = "AIzaSyB9y8GKf4q7lDT9EnFg9XUEkUFrJRwtG5U";
const playlistId = "PLWMGy4BUlHrz1h1CaC4xZtkMsD2pvUp8g";
const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}&playlistId=${playlistId}`;

// 비디오 목록 로드 및 렌더링
function loadVideos() {
  fetch(apiUrl)
    .then((response) => response.json()) // 가져온 데이터를 제이슨으로 변환
    .then((data) => {
      const items = data.items; // API에서 반환한 비디오 아이템 목록을 가져옴
      const videosHtml = items.map((item) => {
        const title = item.snippet.title.length > 100
          ? item.snippet.title.substr(0, 20) + "..."
          : item.snippet.title;
        return `
          <article>
            <a href="https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}" class="pic">
              <img src="${item.snippet.thumbnails.maxres.url}" alt="${title}">
            </a>
            <div class="con">
              <h2>${title}</h2>
            </div>
          </article>
        `;
      }).join(''); // 비디오 아이템을 HTML 형식으로 변환하고 join을 사용하여 문자열로 바꿈
      vidList.innerHTML = videosHtml; // vidList 요소에 비디오 목록을 렌더링.
    });
}

// 비디오 목록 초기 로딩
loadVideos();

// 비디오 팝업 열기 및 닫기 이벤트 핸들러
vidList.addEventListener("click", (e) => {
  e.preventDefault();

  const clickedLink = e.target.closest("a"); // closest로 클릭시 가장 가까운 a태그 찾음

  if (clickedLink) {
    const videoId = clickedLink.href.split("v=")[1]; // 클릭된 비디오 ID 추출

    const pop = document.createElement("figure"); // 비디오 팝업창 생성
    pop.classList.add("pop"); // 팝업 요소에 "pop" 클래스를 추가
    pop.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
      <span class="btnClose">close</span>
    `;

    vidList.appendChild(pop); // vidList 요소에 팝업 추가
  }

  if (e.target.classList.contains("btnClose")) { // 닫기 버튼 클릭유무 확인
    const pop = vidList.querySelector(".pop"); // 팝클래스를 보유한 팝업요소 찾기
    if (pop) {
      pop.remove(); // 팝업창 제거
    }
  }
});


// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  SNS ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

const btnsSNS = document.querySelectorAll(".SNS_company div button");
const boxSNS = document.querySelectorAll(".SNS_BODY div");

btnsSNS.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // on 제거
    btnsSNS.forEach((btn) => btn.classList.remove("on"));
    boxSNS.forEach((box) => box.classList.remove("on"));

    // on 추가
    btn.classList.add("on");
    boxSNS[index].classList.add("on");

    // 0초 이후 액티브 클래스 추가, on클래스 제거
    setTimeout(() => {
      boxSNS.forEach((box) => box.classList.remove("active"));
      boxSNS[index].classList.add("active");
    }, 0);
  });
});
