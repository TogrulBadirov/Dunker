let wishListContainer = document.querySelector('.wishlist-items')

//Create WishList Product Card
function generateWishlistCard(wishListLoc) {
  wishListLoc.forEach(product => {
    let card = document.createElement('div')
    card.classList.add('wishlist-item')
    card.innerHTML = `
          <div class="left-side-wishlist">
            <button href="#" class='remove-wishlist'>
              <i class="fa-solid fa-xmark"></i>
            </button>
            <a href="./product-detail.html?id=${product.id}">
            <div class="wishlist-img">
              <img src="${product.image[0]}" alt="${product.title}" />
            </div>
            </a>
            <div class="wishlist-info">
              <a href="#">${product.title}</a>
              <a href="#"><span>${product.category}</span></a>
            </div>
          </div>
          <div class="right-side-wishlist">
            <div class="product-price">
              <span>$${product.price}</span>
            </div>
            <div class="product-stock-status">
              <span>${
                product.status === 'sold'
                  ? '<b class="text-danger">Out of Stock</b>'
                  : 'In Stock'
              }</span>
            </div>
            <button class="custom-button wishlist-button">
              ADD TO CART
              <i class="fa-solid fa-basket-shopping"></i>
            </button>
          </div>
        `

    const removeFromWishListBtn = card.querySelector('.remove-wishlist')
    const addToBasketFromWishList = card.querySelector('.wishlist-button')

    removeFromWishListBtn.addEventListener('click', () => {
      Swal.fire({
        title: 'Remove from Wishlist',
        text: `Are you sure you want to remove ${product.title} from your wishlist?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then(result => {
        if (result.isConfirmed) {
          wishListArr = wishListArr.filter(x => x.id !== product.id)
          localStorage.setItem('wishlist', JSON.stringify(wishListArr))
          wishListContainer.innerHTML = ''
          generateWishListItem()
          Swal.fire({
            title: 'Removed!',
            text: `${product.title} has been removed from your wishlist.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    })

    addToBasketFromWishList.addEventListener('click', () => {
      if (product.status !== 'sold') {
        let indexOfProduct = bascetArr.findIndex(x => x.id === product.id)

        if (indexOfProduct >= 0) {
          bascetArr[indexOfProduct].count++
        } else {
          product.count = 1
          bascetArr.push(product)
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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Out of Stock',
          text: `${product.title} is out of stock and cannot be added to the basket.`,
          showConfirmButton: false,
          timer: 2000
        })
      }
    })

    wishListContainer.appendChild(card)
  })
}

//Generate Function WishList Product
function generateWishListItem() {
  if (wishListArr.length === 0) {
    const emptyWishlistMessage = document.createElement('div')
    emptyWishlistMessage.classList.add(
      'wishlist-title',
      'text-center',
      'py-4',
      'border',
      'border-top-1',
      'border-bottom-1'
    )
    emptyWishlistMessage.innerHTML =
      '<p class="m-0 fw-bold">NO PRODUCTS ADDED TO THE WISHLIST</p>'
    wishListContainer.appendChild(emptyWishlistMessage)
  } else {
    generateWishlistCard(wishListArr)
  }
}

basketProducts.innerHTML = ''
basketArr.forEach(element => {
  let basketElement = addToCardFromWishList(element)
  basketProducts.appendChild(basketElement)
})

//Add To Card Wish LiST
function addToCardFromWishList(product) {
  let basketProduct = document.createElement('div')
  basketProduct.classList.add('basket-product')
  basketProduct.innerHTML = `
      <a class="basket-img" href="#">
        <img
          src="${product.image[0]}"
          alt="Product" />
      </a>
      <div class="basket-product-content">
        <a href="#" class="product-category">${product.category}</a>
        <a href="#" class="product-item">${product.title}</a>
      <div>
        <span class="product-cost" >$${
          product.discount !== undefined
            ? +product.price * ((100 - product.discount) / 100)
            : product.price
        }</span>
        
        <span class="product-cost" style="color:#727272;text-decoration: line-through;">${
          product.discount !== undefined ? '$' + product.price : ''
        } </span> <span product-cost> x ${product.count}</span>
        </div>
        
      </div>
      <a href="#" class="remove-basket">
        <i class="fa-solid fa-x"></i>
      </a>
      `
  let removeBtn = basketProduct.querySelector('.remove-basket')
  removeBtn.addEventListener('click', e => {
    e.preventDefault()
    //remove element
    basketArr = JSON.parse(localStorage.getItem('basket'))
    basketArr = basketArr.filter(x => x.id !== product.id)
    localStorage.setItem('basket', JSON.stringify(basketArr))
    bascetArr = basketArr
    //totalBasketCount
    let totalBasketCount = 0
    basketArr.forEach(item => {
      totalBasketCount += item.count
    })
    countBaskets.forEach(item => {
      item.innerHTML = totalBasketCount
    })
    //  SubTotal
    let subTotal = 0
    basketArr.forEach(item => {
      if (item.discount === undefined) {
        subTotal += item.price * item.count
      } else {
        subTotal += item.price * ((100 - item.discount) / 100) * item.count
      }
    })
    basketTotals.innerHTML = '$' + subTotal

    // generate basketElements
    basketProducts.innerHTML = ''
    basketArr.forEach(element => {
      let basketElement = generateBasketElements(element)
      basketProducts.appendChild(basketElement)
    })
  })
  return basketProduct
}

generateWishListItem()
