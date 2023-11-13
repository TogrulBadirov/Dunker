const featuredProductsContainer = document.querySelector(
  '#featured-products .featured-products-container .row'
)

const trendingProductsContainer = document.querySelector(
  '#trending .featured-products-container .row'
)

const featuredContainer = document.querySelector(
  '#featured .featured-container .row'
)

const countBasket = document.querySelectorAll('.count-basket')
let bascetArr = JSON.parse(localStorage.getItem('basket')) || []
let wishListArr = JSON.parse(localStorage.getItem('wishlist')) || []

const basketTotal = document.querySelector('.basket-total .amount')

const filterBtn = document.querySelectorAll('#featured-products .filter-btn')
const showAllBtn = document.querySelector('#featured-products .show-all-btn')

countBasket.forEach(item => {
  item.innerHTML = calculateBasketcount()
})
basketTotal.innerHTML = '$' + calculateSubTotal()

async function getData() {
  try {
    const response = await axios.get("http://localhost:3000/products");
  //generating FEATURED PRODUCTS
  response.data.forEach(element => {
    if (element.type === 'featured') {
      let card = generateCard(element)

      let addToBasketBtn = card.querySelector('.add-to-basket-button')
      let addToWishListBtn = card.querySelector('.add-to-fav-button')

      addToBasketBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let indexOfProduct = bascetArr.findIndex(x => x.id === element.id)

        if (indexOfProduct >= 0) {
          bascetArr[indexOfProduct].count++
        } else {
          element.count = 1
          bascetArr.push(element)
        }
        basketProducts.innerHTML = ''


        bascetArr.forEach(element => {

          let basketElement = generateBasketElements(element)
          basketProducts.appendChild(basketElement)
        })

        countBasket.forEach(item => {
          item.innerHTML = calculateBasketcount()
        })
        basketTotal.innerHTML = '$' + calculateSubTotal()

        localStorage.setItem('basket', JSON.stringify(bascetArr))
        Swal.fire({
          icon: 'success',
          title: 'Added to Basket',
          text: `${element.title} has been added to your basket.`,
          showConfirmButton: false,
          timer: 1500
        })
      })
      featuredProductsContainer.appendChild(card)

      addToWishListBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const findWishListProduct = wishListArr.find(x => x.id === element.id)
        if (!findWishListProduct) {
          wishListArr.push(element)
          localStorage.setItem('wishlist', JSON.stringify(wishListArr))
          addToWishListBtn.classList.add('active')
          Swal.fire({
            icon: 'success',
            title: 'Added to WishList',
            text: `${element.title} has been added to your basket.`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Already in Wishlist',
            text: `${element.title} is already in your wishlist.`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  })

  //generating TRENDING
  let cardCount = 1
  response.data.forEach(element => {
    if (element.type === 'trending') {
      let card = generateTrendingCard(element, cardCount)

      let addToBasketBtn = card.querySelector('.add-to-basket-button')
      let addToWishListBtn = card.querySelector('.add-to-fav-button')
      addToBasketBtn.addEventListener('click', () => {
        let indexOfProduct = bascetArr.findIndex(x => x.id === element.id)

        if (indexOfProduct >= 0) {
          bascetArr[indexOfProduct].count++
        } else {
          element.count = 1
          bascetArr.push(element)
        }
        basketProducts.innerHTML = ''
        bascetArr.forEach(element => {
          let basketElement = generateBasketElements(element)
          basketProducts.appendChild(basketElement)
        })

        countBasket.forEach(item => {
          item.innerHTML = calculateBasketcount()
        })
        basketTotal.innerHTML = '$' + calculateSubTotal()

        localStorage.setItem('basket', JSON.stringify(bascetArr))
        Swal.fire({
          icon: 'success',
          title: 'Added to Basket',
          text: `${element.title} has been added to your basket.`,
          showConfirmButton: false,
          timer: 1500
        })
      })

      addToWishListBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const findWishListProduct = wishListArr.find(x => x.id === element.id)
        if (!findWishListProduct) {
          wishListArr.push(element)
          localStorage.setItem('wishlist', JSON.stringify(wishListArr))
          addToWishListBtn.classList.add('active')
          Swal.fire({
            icon: 'success',
            title: 'Added to Wishlist',
            text: `${element.title} has been added to your basket.`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Already in Wishlist',
            text: `${element.title} is already in your wishlist.`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      try {
        trendingProductsContainer.appendChild(card);
      } catch (error) {
        
      }
      cardCount++
    }
  })

  //generating featuredCards
  let textCount = 0
  response.data.forEach(element => {
    if (element.type === 'newColection') {
      let card = generateFeaturedCard(element, textCount)

      let addToBasketBtn = card.querySelector('.add-to-basket-button')
      let addToWishListBtn = card.querySelector('.add-to-fav-button')

      addToBasketBtn.addEventListener('click', () => {
        let indexOfProduct = bascetArr.findIndex(x => x.id === element.id)

        if (indexOfProduct >= 0) {
          bascetArr[indexOfProduct].count++
        } else {
          element.count = 1
          bascetArr.push(element)
        }
        basketProducts.innerHTML = ''
        bascetArr.forEach(element => {
          let basketElement = generateBasketElements(element)
          basketProducts.appendChild(basketElement)
        })

        countBasket.forEach(item => {
          item.innerHTML = calculateBasketcount()
        })
        basketTotal.innerHTML = '$' + calculateSubTotal()

        localStorage.setItem('basket', JSON.stringify(bascetArr))
        Swal.fire({
          icon: 'success',
          title: 'Added to Basket',
          text: `${element.title} has been added to your basket.`,
          showConfirmButton: false,
          timer: 1500
        })
      })
      featuredContainer.appendChild(card)

      addToWishListBtn.addEventListener('click', () => {
        const findWishListProduct = wishListArr.find(x => x.id === element.id)
        if (!findWishListProduct) {
          wishListArr.push(element)
          localStorage.setItem('wishlist', JSON.stringify(wishListArr))
          addToWishListBtn.classList.add('active')
          Swal.fire({
            icon: 'success',
            title: 'Added to WishList',
            text: `${element.title} has been added to your basket.`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Already in Wishlist',
            text: `${element.title} is already in your wishlist.`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })

      textCount++
    }
  })

  //
  var swiper = new Swiper('.productCardSlider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  } catch (error) {
    
  }
}

getData()

function generateFeaturedCard(product, count) {
  let card = document.createElement('div')

  card.classList.add('product-card', 'col-lg-6', 'col-md-12')
  card.setAttribute('data', product.category)
  card.innerHTML = `
<a href="./product-detail.html?id=${product.id}">
  <span id="${count!==0?"featured-text":""}">${count===0?"Featured":"New Collection"}</span>
  <img
    src="${product.image[0]}"
    alt="product"
  />
  <div class="product-card-details">
    <div class="product-detail-content">
      <a href="#">${product.brend}</a>
      <a class="product-detail-title">${product.title}</a>
      <a href="#">${product.category}</a>
    </div>
    <p>$${product.price}</p>
    <button class="add-to-fav-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16.932"
        height="16"
        viewBox="0 0 16.932 16"
      >
        <path
          d="M8.467 16a1.756 1.756 0 0 1-.94-.273c-.67-.422-6.576-4.254-7.425-8.776a6.154 6.154 0 0 1 1.27-4.977A5.177 5.177 0 0 1 5.356 0a4.369 4.369 0 0 1 3.111 1.086A4.185 4.185 0 0 1 11.577 0a5.18 5.18 0 0 1 3.983 1.973 6.157 6.157 0 0 1 1.269 4.977c-.849 4.522-6.755 8.354-7.426 8.777a1.753 1.753 0 0 1-.936.273ZM5.356 2A3.186 3.186 0 0 0 2.92 3.241a4.133 4.133 0 0 0-.853 3.341c.646 3.439 5.543 6.806 6.4 7.371.857-.565 5.754-3.932 6.4-7.371a4.136 4.136 0 0 0-.851-3.341A3.192 3.192 0 0 0 11.577 2a3.021 3.021 0 0 0-2.354 1.122 1 1 0 0 1-.756.346 1 1 0 0 1-.756-.345A3.024 3.024 0 0 0 5.356 2Z"
        />
      </svg>
    </button>
  </div>
  <button class="add-to-basket-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="17"
      viewBox="0 0 15 17"
    >
      <path
        d="M14 3.5h-3a3.5 3.5 0 0 0-7 0H1a1 1 0 0 0-1 1V15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4.5a1 1 0 0 0-1-1ZM7.5 2A1.5 1.5 0 0 1 9 3.5H6A1.5 1.5 0 0 1 7.5 2ZM13 15H2V5.5h2v1a1 1 0 0 0 2 0v-1h3v1a1 1 0 0 0 2 0v-1h2Z"
      ></path>
    </svg>
  </button>
</a>
                    `;

  return card
}
function generateCard(product) {
  let card = document.createElement('div')

  card.classList.add('featured-products-card', 'col-lg-3', 'col-md-6', 'col-12')
  card.setAttribute('data', product.category)
  card.innerHTML = `
  <a href="./product-detail.html?id=${product.id}">
    <span class="${product.status === "new" ? "new-product-icon" : ""}">${
    product.status === "new" ? product.status : ""
  }</span>
    <span class="${product.status === 'sale' ? 'sale-product-icon' : ''}">${
    product.status === 'sale' ? product.status : ''
  }</span>
    <button class="add-to-fav-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16.932"
        height="16"
        viewBox="0 0 16.932 16"
      >
        <path
          d="M8.467 16a1.756 1.756 0 0 1-.94-.273c-.67-.422-6.576-4.254-7.425-8.776a6.154 6.154 0 0 1 1.27-4.977A5.177 5.177 0 0 1 5.356 0a4.369 4.369 0 0 1 3.111 1.086A4.185 4.185 0 0 1 11.577 0a5.18 5.18 0 0 1 3.983 1.973 6.157 6.157 0 0 1 1.269 4.977c-.849 4.522-6.755 8.354-7.426 8.777a1.753 1.753 0 0 1-.936.273ZM5.356 2A3.186 3.186 0 0 0 2.92 3.241a4.133 4.133 0 0 0-.853 3.341c.646 3.439 5.543 6.806 6.4 7.371.857-.565 5.754-3.932 6.4-7.371a4.136 4.136 0 0 0-.851-3.341A3.192 3.192 0 0 0 11.577 2a3.021 3.021 0 0 0-2.354 1.122 1 1 0 0 1-.756.346 1 1 0 0 1-.756-.345A3.024 3.024 0 0 0 5.356 2Z"
        />
      </svg>
    </button>

    <div class="swiper productCardSlider">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img
            src="${product.image[0]}"
            alt="productImg"
          />
        </div>
        <div class="swiper-slide">
          <img
            src="${product.image[1]}"
            alt="productImg"
          />
        </div>
        <div class="swiper-slide">
          <img
            src="${product.image[2]}"
            alt="productImg"
          />
        </div>
        <div class="swiper-slide">
          <img
            src="${product.image[3]}"
            alt="productImg"
          />
        </div>
        <div class="swiper-slide">
          <img
            src="${product.image[4]}"
            alt="productImg"
          />
        </div>
        
      </div>
    <button><div class="swiper-button-next"></div></button>
    <button><div class="swiper-button-prev"></div></button>
    </div>

    <div class="product-card-content">
      <a href="#">${product.brend}</a>
      <a href="#" class="product-title">${product.title}</a>
      <a href="#" class="product-category">${product.category}</a>
      <div>
      <span>$${
        product.discount !== undefined
          ? +product.price * ((100 - product.discount) / 100)
          : product.price
      }</span>
      
      <span style="color:#727272;text-decoration: line-through;">${
        product.discount !== undefined ? '$' + product.price : ''
      }</span>
      </div>
    </div>

    <button class="add-to-basket-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="17"
        viewBox="0 0 15 17"
      >
        <path
          d="M14 3.5h-3a3.5 3.5 0 0 0-7 0H1a1 1 0 0 0-1 1V15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4.5a1 1 0 0 0-1-1ZM7.5 2A1.5 1.5 0 0 1 9 3.5H6A1.5 1.5 0 0 1 7.5 2ZM13 15H2V5.5h2v1a1 1 0 0 0 2 0v-1h3v1a1 1 0 0 0 2 0v-1h2Z"
        ></path>
      </svg>
    </button>
    </a>
                    `;

  return card
}
function generateTrendingCard(product, count) {
  let card = document.createElement('div')

  if (count === 3 || count === 4) {
    card.classList.add('featured-products-card', 'col-lg-6', 'col-12')
  } else {
    card.classList.add(
      'featured-products-card',
      'col-lg-3',
      'col-md-6',
      'col-12'
    )
  }
  card.setAttribute('data', product.category)
  card.innerHTML = `
  <a href="./product-detail.html?id=${product.id}">
    <span class="${product.status === "new" ? "new-product-icon" : ""}">${
    product.status === "new" ? product.status : ""
  }</span>
    <span class="${product.status === 'sale' ? 'sale-product-icon' : ''}">${
    product.status === 'sale' ? product.status : ''
  }</span>
    <button class="add-to-fav-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16.932"
        height="16"
        viewBox="0 0 16.932 16"
      >
        <path
          d="M8.467 16a1.756 1.756 0 0 1-.94-.273c-.67-.422-6.576-4.254-7.425-8.776a6.154 6.154 0 0 1 1.27-4.977A5.177 5.177 0 0 1 5.356 0a4.369 4.369 0 0 1 3.111 1.086A4.185 4.185 0 0 1 11.577 0a5.18 5.18 0 0 1 3.983 1.973 6.157 6.157 0 0 1 1.269 4.977c-.849 4.522-6.755 8.354-7.426 8.777a1.753 1.753 0 0 1-.936.273ZM5.356 2A3.186 3.186 0 0 0 2.92 3.241a4.133 4.133 0 0 0-.853 3.341c.646 3.439 5.543 6.806 6.4 7.371.857-.565 5.754-3.932 6.4-7.371a4.136 4.136 0 0 0-.851-3.341A3.192 3.192 0 0 0 11.577 2a3.021 3.021 0 0 0-2.354 1.122 1 1 0 0 1-.756.346 1 1 0 0 1-.756-.345A3.024 3.024 0 0 0 5.356 2Z"
        />
      </svg>
    </button>

    <div class="swiper productCardSlider">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img
            src="${product.image[0]}"
            alt="productImg"
          />
        </div>
        <div class="swiper-slide">
          <img
            src="${product.image[1]}"
            alt="productImg"
          />
        </div>
        <div class="swiper-slide">
          <img
            src="${product.image[2]}"
            alt="productImg"
          />
        </div>
        <div class="swiper-slide">
          <img
            src="${product.image[3]}"
            alt="productImg"
          />
        </div>
        <div class="swiper-slide">
          <img
            src="${product.image[4]}"
            alt="productImg"
          />
        </div>
        
      </div>
    <button><div class="swiper-button-next"></div></button>
    <button><div class="swiper-button-prev"></div></button>
    </div>

    <div class="product-card-content">
      <a href="#">${product.brend}</a>
      <a href="#" class="product-title">${product.title}</a>
      <a href="#" class="product-category">${product.category}</a>
      <div>
      <span>$${
        product.discount !== undefined
          ? +product.price * ((100 - product.discount) / 100)
          : product.price
      }</span>
      
      <span style="color:#727272;text-decoration: line-through;">${
        product.discount !== undefined ? '$' + product.price : ''
      }</span>
      </div>
    </div>

    <button class="add-to-basket-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="17"
        viewBox="0 0 15 17"
      >
        <path
          d="M14 3.5h-3a3.5 3.5 0 0 0-7 0H1a1 1 0 0 0-1 1V15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4.5a1 1 0 0 0-1-1ZM7.5 2A1.5 1.5 0 0 1 9 3.5H6A1.5 1.5 0 0 1 7.5 2ZM13 15H2V5.5h2v1a1 1 0 0 0 2 0v-1h3v1a1 1 0 0 0 2 0v-1h2Z"
        ></path>
      </svg>
    </button>
    </a>
                    `;

  return card
}

function calculateBasketcount() {
  let totalBasketCount = 0
  bascetArr.forEach(item => {
    totalBasketCount += item.count
  })
  return totalBasketCount
}

function calculateSubTotal() {
  let subTotal = 0
  bascetArr.forEach(item => {
    if (item.discount === undefined) {
      subTotal += item.price * item.count
    } else {
      subTotal += item.price * ((100 - item.discount) / 100) * item.count
    }
  })
  return subTotal
}

filterBtn.forEach(element => {
    element.addEventListener('click', () => {
        let buttonCategory = element.getAttribute('data');
        let cards = featuredProductsContainer.querySelectorAll('.featured-products-card');
        cards.forEach(item => {
            let cardCategory = item.getAttribute('data');
            if (buttonCategory === cardCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
try {
  showAllBtn.addEventListener('click',()=>{
    let cards = featuredProductsContainer.querySelectorAll('.featured-products-card');
    cards.forEach(item => {
        item.style.display = 'block';
    });
})
} catch (error) {
  
}
    
const categoryItem = document.querySelectorAll('.category-items');
categoryItem.forEach(element => {
  element.addEventListener('mousemove', function(e) {
  const productOffset = element.getBoundingClientRect();
  const categoryImage = element.querySelector('.product-image');
  categoryImage.style.left = e.pageX  + 'px';
  categoryImage.style.top = e.pageY + 'px';
},100);
});