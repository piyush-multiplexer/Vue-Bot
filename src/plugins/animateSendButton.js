export function animateSendButton () {
  let elem = $('.bot-button-round')[0]
  $(elem).animate({ left: '20vh' })
  // move(elem).rotate(-90).end()
  // setTimeout(function () {
  //   $(elem).animate({ bottom: '14vh' }, 'slow')
  // }, 10)
  //
  // setTimeout(function () {
  //   move(elem).rotate(-180).end()
  // }, 200)
  // setTimeout(function () {
  //   $(elem).animate({ right: '65vh' }, 'slow')
  // }, 550)
}
