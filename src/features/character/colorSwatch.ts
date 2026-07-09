// 같은 옵션 문자열이면 항상 같은 색이 나오도록 해시 기반으로 색 생성.
// 실제 이미지 붙일 때는 이 함수 호출부만 <img src={...}>로 바꾸면 됨.
export function getSwatchColor(label: string): string {
  let hash = 0;
  for (let i = 0; i < label.length; i += 1) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 60%)`;
}