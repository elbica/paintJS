//중요! js파일을 가져올 때는 html의 body 맨 밑에 넣어야 한다

const Canvas = document.getElementById("jsCanvas");
console.log(Canvas);
//context : canvas안 요소들 접근, 픽셀들
const ctx = Canvas.getContext("2d");
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");


//css의 width, height와는 다른 개념. pixel modifier
Canvas.width = 700; Canvas.height = 700;

ctx.fillStyle ="white";
ctx.fillRect(0,0,Canvas.width, Canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth=2.5;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        //페인트 중이 아닐 땐, 움직이면서 path를 만든다
        //path는 line의 시작점으로 생각한다
        ctx.beginPath();
        //moveTo : path갱신..?
        ctx.moveTo(x,y);
    }else{
        //lineTo: path의 마지막 점과 (x,y)를 직선으로 연결한다
        ctx.lineTo(x,y);
        ctx.stroke();
    }

}
//let : ES6이후 var보다 명확한 변수 선언 가능 (중복 선언 불가, 영향 볌위는 {})
let painting = false;
let filling = false;

function stopPainting(event){painting = false;}
function startPainting(event){painting = true;}
function colorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function rangeChange(event){ctx.lineWidth = event.target.value;}
function modeClick(event){
    if(filling===true){
        filling = false;
        mode.innerText="Fill"
    } else {
        filling = true;
        mode.innerText="Paint"
    }
}
function canvasClick(event){
    if(filling)
        ctx.fillRect(0,0,Canvas.width,Canvas.height);
}
//preventDefault : 클릭 방지
function CM(event){event.preventDefault();}

//이미지 다운로드 하기
function saveClick(event){
    const image = Canvas.toDataURL();

    //download는 a태그의 속성, href은 링크로 이동하지만 download는 링크를 다운로드함
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJsImage";
    link.click();

}
if(mode){
    mode.addEventListener("click",modeClick)
}
if(Canvas){
    //mouseMove할 때 onMouseMove함수 실행
    Canvas.addEventListener("mousemove", onMouseMove);

    //마우스가 클릭했을 때
    Canvas.addEventListener("mousedown", startPainting);
    Canvas.addEventListener("mouseup", stopPainting);
    Canvas.addEventListener("mouseleave", stopPainting);
    Canvas.addEventListener("click",canvasClick);

    //오른쪽 마우스 클릭
    Canvas.addEventListener("contextmenu",CM);

}
//신기한 문법...html collection인 colors를 배열로 만들고 forEach메소드를 호출해
//각 color원소에 이벤트 리스너를 붙인다. => 는 js의 람다식이다
Array.from(colors).forEach(color => color.addEventListener("click",colorClick));

if(range){
    //range는 input에 반응
    range.addEventListener("input",rangeChange);
}
if(save){
    save.addEventListener("click",saveClick);
}