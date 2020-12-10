# carrot-game

강의 수강 전에 혼자 먼저 만들어보기

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

pop-up 엘리먼트에 `opacity`를 주면 자식요소에 상속되는 문제는 `background-color: #00000090;` 을 입력하는 방법으로 해결했다.

정리가 필요하다.  
너무나 뒤죽박죽 얼렁뚱땅  
변수 이름 짓는 연습도 필요하다.  
봤을 때 어떤 기능을 하는 아인지 헷갈림  
그래도 함수로 묶어서 기능을 구현시키는 연습을 할 수 있었다.

### 201210

계속해서 코드 보완할 예정
