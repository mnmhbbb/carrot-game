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
