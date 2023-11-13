let basketArr = JSON.parse(localStorage.getItem('basket')) || []
const basketProducts = document.querySelector('.basket-products')
const countBaskets = document.querySelectorAll('.count-basket')
const basketTotals = document.querySelector('.basket-total .amount')

basketProducts.innerHTML = ''
basketArr.forEach(element => {
  let basketElement = generateBasketElements(element)
  basketProducts.appendChild(basketElement)
})

function generateBasketElements(product) {
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
    // Swal.fire({
    //   icon: 'warning',
    //   title: 'Removed from Basket',
    //   text: `${product.name} has been removed from your basket.`,
    //   showConfirmButton: false,
    //   timer: 1500
    // })
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
