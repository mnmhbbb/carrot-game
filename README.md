# carrot-game

강의 수강 전에 혼자 먼저 만들어보고 인강 보고 리팩토링

---

### 201209 04:45

일단 html 마크업까지 완료했다.

### 201209 05:22

css 스타일링까지 마쳤다.

### 201209

마크업 BEM 규칙에 맞게 수정하고, 기타 css 작은 오류를 수정했다.  
자바스크립트로 플레이 버튼 - 포즈 버튼 기능을 넣었다.  
`setTimeout, setInterval, clearTimeout` 타임 포즈 기능은 아직 해결하지 못했다.  
`new Image()`를 통해 당근, 벌레 이미지를 넣는 것은 성공했으나, 랜덤배치 문제는 아직 해결하고 있다.

### 201210 01:34

```javascript
let randomY = Math.floor(Math.random() * 100);
let randomX = Math.floor(Math.random() * 750);
bug.style.margin = `${randomY}px ${randomX}px`;
```

margin을 이용해서 좌우로는 크게, 상하로는 작게 랜덤 숫자를 부여했다.  
그러나 이미지가 한장만 넣어진다는 문제가 있다.

### 201210 02:51

`position: absolute`를 이용하여 정해진 범위 안에서 랜덤 배치하는 방법으로.  
MDN 사이트의 예제를 참고했다.

```javascript
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
```

### 201210 03:58

원래 안 보였는데, 이벤트 발생했을 때 보이게 하는 방법 중  
`classList.add` 방법 말고 새로운 방법을 알게 되었다.  
css에 `visibility: hidden;` 을 입력하고,  
js에서 `gameTimer.style.visibility = "visible";` 이러한 방법을 사용한다.

그리고 play 버튼을 누르면 아이콘이 바뀌고, 맵이 펼쳐지고, 스코어와 타이머가 보이는 기능까지 완료했다.

### 201210 05:13

`setInterval`과 `clearInterval`을 사용해서 게임 시작 타이머 기능을 만들었다.  
`setInterval`을 호출하면 리턴되는 함수를 `clearInterval`에 입력하면 된다는 것을 알게 되었다.

### 201210 07:08

boolean을 기준으로 크게 `startGame/stopGame/finishGame` 3 함수로 나눴다.

당근을 클릭했는지, 벌레를 클릭했는지 구분하는 코드를 작성하던 중, `elements.matches()`에 대해 알게 되었다.  
기능은 `classList.contains`과 동일하게 selector에 대해 확인할 수 있지만 더 간편하다. 다만, 브라우저 호환성이 조금 떨어진다.

pop-up 엘리먼트에 `opacity`를 줬을 때 자식요소까지 상속되는 문제는 `background-color: #00000090;` 을 입력하는 방법으로 해결했다.

정리가 필요하다.  
너무나 뒤죽박죽 얼렁뚱땅  
변수 이름 짓는 연습도 필요하다.  
봤을 때 어떤 기능을 하는 아인지 헷갈림  
그래도 함수로 묶어서 기능을 구현시키는 연습을 할 수 있었다.

### 201210

인강에서 배운 내용으로 계속해서 코드 보완할 예정  

### 201211

자바스크립트 파일을 역할과 목적에 따라서 모듈로 나누기.  
모듈은 `export`와 `import`를 붙여서 내보내고 가져올 수 있다.  
html에 `<script type="module">`으로 해당 스크립트가 모듈이라는 걸 알 수 있게 나타낸다.  
`Class`에 대해 공부하고 이용하기.  

popup.js 업로드 완료.

### 201212

같은 방법으로 field.js 만드는 법을 배웠다.  
자바스크립트는 타입스크립트처럼 프라이빗한 변수를 만들 수 없어서  
`_addItem`과 같이 언더스코어를 앞에 붙여서 접근 범위를 명시할 수 있다는 것을 알게 되었다.  

`this.field.addEventListener("click", this.onClick);`  
클릭 이벤트리스너를 제대로 등록했음에도 아이템 클릭 시 작동이 되지 않는 문제.

### 201212

이전의 문제는 Class 내부에서 호출한 `this.onClick`가 원인이었다.  
this가 바인딩 되지 않아서 Class에 대한 정보가 전달되지 않아서 발생한 문제.  
이 문제를 통해 `this`, `bind` 그리고 `arrow function`에 대해 자세히 공부할 수 있었다.  

```javascript
this.onClick = this.onClick.bind(this);
```
위와 같이 함수와 this(현 클래스)를 바인딩한 것을 `this.onClick`라고 명시적으로 다시 할당하는 방법  

그리고 `arrow function`의 특징을 활용하여 사용하는 방법이 있다.  
`arrow function`안에서 this를 사용하면 외부에서 this 값을 가져온다.  
따라서,
```javascript
this.field.addEventListener('click', e => on.Click(e));
```
또는,
```javascript
onClick = e => { }
```
다음과 같이 화살표함수를 활용하여 이벤트를 받아오면 정상적으로 기능이 실행된다.


`bind`를 알아보면서 알게 된 함수의 메소드 `call`과 `apply`가 있다.  
this에 객체를 바인딩한다는 공통점이 있지만, `call`과 `apply`는 함수를 호출한다.  
```javascript
func.apply(thisArg, [argsArray]) 
```
`thisArg`는 this에 바인딩할 객체, `argArray`는 함수를 호출할 때 넘길 인자들의 배열을 나타냄  
(`call`은 보통 함수처럼 인자를 넣는다.)

### 201213
game 부분까지 완료.  



`const game = new Game(5, 5, 5);` 부분을 개선하기 위해 `builder pattern` 이라는 것을 배웠다.  
위 코드는 어떤 위치에 어떤 타입의 데이터를 받는지 명시적이지 않아서 그 인자가 어떤 값인지 파악이 힘들기 때문에 실수할 가능성이 있다.  

