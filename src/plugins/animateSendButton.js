export function animateSendButton () {
  move('.bot-button-round').rotate(-45).end()
  setTimeout(function () {
    move('.bot-button-round').translate(80, -200).rotate(-45).end()
  }, 200)
}
