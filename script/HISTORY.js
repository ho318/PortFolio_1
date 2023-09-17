// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ header ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();

    //  on이 있으면 제거, 없으면 추가
    btnCall.classList.toggle("on");
    menuMo.classList.toggle('on');
}