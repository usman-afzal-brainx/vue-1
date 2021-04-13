Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
  <div class="product">
  <div class="product-image">
    <img :src="image" alt="" />
  </div>
  <div class="product-info">
    <h1>{{title}}</h1>
    <p v-if="inStock">In stock</p>
    <p v-else>Out of stock</p>
    <p>User is premium: {{premium}}</p>
    <p>Shipping: {{shipping}}</p>

    <ul>
      <li v-for="detail in details">{{detail}}</li>
    </ul>
    <div
      v-for="(variant, index) in variants"
      @mouseover="updateProduct(index)"
      :key="variant.variantId"
      class="color-box"
      :style="{backgroundColor: variant.variantColor}"
    ></div>
    <button
      v-on:click="addToCart"
      :disabled="!inStock"
      :class="{disabledButton : !inStock}"
    >
      Add to Cart
    </button>
  </div>

  <div>
  <h2>Reviews</h2>
  <p v-if="!reviews.length">There are no reviews yet.</p>
  <ul>
  <li v-for= "review in reviews">
  <p>{{review.name}} </p>
  <p>{{review.review}} </p>
  <p>{{review.rating}} </p>

  </li>
  </ul>
  </div>
  <product-review @review-submitted="addReview"></product-review>
  </div>

  `,
  data() {
    return {
      brand: "Nike",
      product: "socks",
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          varianId: "2234",
          variantColor: "Green",
          variantImage: "./assets/images/socks_green.jpg",
          variantColor: "green",
          variantQuantity: 0,
        },
        {
          variantId: "2235",
          variantColor: "Blue",
          variantImage: "./assets/images/socks_blue.jpg",
          variantColor: "blue",
          variantQuantity: 20,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart: function () {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function (index) {
      this.selectedVariant = index;
    },
    addReview: function (productReview) {
      this.reviews.push(productReview);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      if (this.premium) return "Free";
      return "$2.93";
    },
  },
});

Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p>
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="name" />
  </p>
  <p>
    <label for="review">Review:</label>
    <textarea
      name="review"
      id="review"
      cols="30"
      rows="10"
      v-model="review"
    ></textarea>
  </p>
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
  <button type="submit">Submit</button>
</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
    };
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };
      this.$emit("review-submitted", productReview);
      this.name = null;
      this.review = null;
      this.rating = null;
    },
  },
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
  },
});
