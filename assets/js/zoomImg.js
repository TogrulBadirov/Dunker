new Zoomist('.zoomist-container', {
  maxScale: 4,
  bounds: true,
  slider: true,
  zoomer: true
})

let mainImg = document.getElementById('zoom-img')
let galleryImages = document.querySelectorAll('.gallery-img')

galleryImages.forEach(item => {
  item.addEventListener('click', e => {
    mainImg.src = item.src
  })
})
