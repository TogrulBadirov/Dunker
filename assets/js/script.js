//Burger Menu Toggle and Close Discount Message
const menuBtn = document.querySelector('.menu-btn')
const mobileNavMenu = document.getElementById('mobile-nav')
const removeBtn = document.querySelector('.close-btn')
const discountMessage = document.querySelector('.discount-message')

removeBtn.addEventListener('click', e => {
  discountMessage.classList.remove('d-lg-block')
})

//Toggle Burger menu and mobile menu navigation
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open')
  mobileNavMenu.classList.toggle('active')
})

//Accordion dropdowns for Mobile Navigation
const mobileNavLinks = document.querySelectorAll('.mobile-navbar-link')
const menuItems = document.querySelectorAll('.mobile-navbar-item')

menuItems.forEach(item => {
  item.addEventListener('click', e => {
    // e.stopPropagation()

    menuItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active')
      }
    })
    item.classList.toggle('active')
  })
})

//Swiper Slider Progress Bar Type
const progressCircle = document.querySelector('.autoplay-progress svg')
const progressContent = document.querySelector('.autoplay-progress span')

//SwiperJS Configuration,SplitType animation with GSAP
var swiper = new Swiper('.mySwiper', {
  spaceBetween: 30,
  loop: true,
  speed: 1000,
  effect: 'fade',
  autoplay: {
    delay: 8000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  on: {
    slideChange: function () {
      const texts =
        this.slides[this.activeIndex].querySelectorAll('.slider-heading')
      texts.forEach(text => {
        new SplitType(text)
        gsap.to(text.querySelectorAll('.char'), {
          y: 0,
          stagger: 0.02,
          delay: 0.2,
          duration: 0.1
        })
      })
    },
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty('--progress', 1 - progress)
      progressContent.textContent = `${Math.ceil(time / 1000)}s`
    }
  }
})

let navbar = document.getElementById('nav')
let navbarHeight = navbar.offsetHeight
let scrollPos = window.scrollY

function updateNavbar() {
  scrollPos = window.scrollY

  if (scrollPos > 800) {
    navbar.classList.add('sticky')
  } else {
    navbar.classList.remove('sticky')
    //gedende animasiya ile getsin ele bil
  }
}

window.addEventListener('scroll', function () {
  updateNavbar()
})

updateNavbar()
