const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const body = document.querySelector("#detail-product");
const productPrice = document.querySelector(".product-heading span");
const productTitle = document.querySelector(".product-heading h1");
const productCategory = document.querySelector(".category a");
const productMainImg = document.querySelector(".zoomist-image img");
const productDetailImgs = document.querySelectorAll(".gallery-item img");

const productCount = document.querySelector(".product-count");
const decreaseBtn = document.querySelector(".decrease-product");
const increaseBtn = document.querySelector(".increase-product");
productCount.innerHTML = "1";

const featuredProductContainer = document.querySelector(
  ".featured-products-container .row"
);
let relatedCategory;

async function getProductData() {
  try {
    const response = await axios.get(
      `http://localhost:3000/products/${productId}`
    );
    const resp = await axios.get(`http://localhost:3000/products`);
    const productData = response.data;
    productPrice.innerHTML = "$" + productData.price;
    productTitle.innerHTML = productData.title;
    productCategory.innerHTML = productData.category;
    productMainImg.src = productData.image[0];
    for (let i = 0; i < 4; i++) {
      productDetailImgs[i].src = productData.image[i + 1];
    }

    let addToBasketBtn = document.querySelector(
      "#detail-product .custom-button"
    );
    console.log(addToBasketBtn);
    addToBasketBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let indexOfProduct = bascetArr.findIndex((x) => x.id == productId);
      if (indexOfProduct >= 0) {
        bascetArr[indexOfProduct].count += parseInt(productCount.textContent);
      } else {
        productData.count = parseInt(productCount.textContent);
        bascetArr.push(productData);
      }
      basketProducts.innerHTML = "";

      bascetArr.forEach((element) => {
        let basketElement = generateBasketElements(element);
        basketProducts.appendChild(basketElement);
      });

      countBasket.forEach((item) => {
        item.innerHTML = calculateBasketcount();
      });
      basketTotal.innerHTML = "$" + calculateSubTotal();

      localStorage.setItem("basket", JSON.stringify(bascetArr));
    });

    //Related card

    resp.data.forEach((element) => {
      if (element.category === productData.category) {
        let card = generateCard(element);
        featuredProductContainer.appendChild(card);
      }
    });
  } catch (error) {
    body.innerHTML = "Can't find the product";
  }
}
getProductData();
console.log(relatedCategory);
//Counter

increaseBtn.addEventListener("click", () => {
  productCount.innerHTML++;
});
decreaseBtn.addEventListener("click", () => {
  if (parseInt(productCount.textContent) > 1) {
    productCount.innerHTML--;
  }
});
