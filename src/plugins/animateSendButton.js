export function animateSendButton () {
  // let elem = $('.bot-button-round-animate')[0]
  // let elemClone = $(elem).clone()
  // elem.style.visibility = 'visible'
  // move(elem).rotate(-90).end()
  // setTimeout(function () {
  //   $(elem).animate({ bottom: '9vh' }, 200)
  // }, 100)
  //
  // setTimeout(function () {
  //   move(elem).rotate(-180).end()
  // }, 150)
  // setTimeout(function () {
  //   $(elem).animate({ right: '65vh' }, 600)
  // }, 200)
  // setTimeout(function () {
  //
  //   elem = elemClone
  // },100)
  let elem = $('.bot-button-round')[0]
  move(elem).rotate(-90).end()
  setTimeout(function () {
    $(elem).animate({ bottom: '14vh' }, 'slow')
  }, 10)

  setTimeout(function () {
    move(elem).rotate(-180).end()
  }, 200)
  setTimeout(function () {
    $(elem).animate({ right: '65vh' }, 'slow')
  }, 550)
}
