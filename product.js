let cart=[];
//async function to fetch products

async function fetchProducts() {
    try {
        let res = await fetch("https://fakestoreapi.com/products?limit=20");
        let products = await res.json();
        displayProducts(products);

    }catch (err) {
        console.error("Error fetching products:",err);
    }
    
}
//Display products in grid
function displayProducts(products){
    const grid = document.getElementById("productGrid");
    grid.innerHTML="";
    products.forEach((p) =>{
        const card = document.createElement("div");
        card.className = "product-card";

        //product main content
        card.innerHTML=`
            <img src="${p.image}" alt="{p.title}">
            <h3>${p.title}</h3>
            <p><strong>Category:</strong>${p.category}</p>
            <p class="price">$${p.price}</p>`;

            //Add to cart button
            const addBtn = document.createElement("button");
            addBtn.className = "add-btn";
            addBtn.textContent = "Add to cart";
            addBtn.addEventListener("click",() =>addToCart(p));
            card.appendChild(addBtn);

            //Detail box (hover popup)
            const detailBox = document.createElement("div");
            detailBox.className = "detail-box";
            detailBox.innerHTML=`
            <img src="${p.image}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <p class="price">Price:$${p.price}</p>
            `;
            card.appendChild(detailBox);
            grid.appendChild(card);
    });
}

//Add to cart function
function addToCart(product) {
    cart.push(product);
    updateCart();
}
//update cart display
function updateCart(){
    const countEI= document.getElementById("cartCount");
    const totalEI= document.getElementById("cartTotal");
    countEI.textContent = cart.length;

    let total = cart.reduce((sum,item) => sum + item.price,0);
    totalEI.textContent=total.toFixed(2);
}
 //Load products on page load
    fetchProducts();