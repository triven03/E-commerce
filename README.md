
## The features in the API :

- ✅ Signing Up, signing in and signing out of users
- ✅ Authentication using JSON Web tokens (JWT).
- ✅ All CRUD Operations
- ✅ Add to cart
- ✅ Create Order
- ✅ Order hitory

## EndPoints


 - [Authentication](#authentication)
  - [Login](#login)
  - [Sign Up](#sign-up)
  - [Log Out](#log-out)

 - [Schema User](#schema-user)

- [Addresses](#addresses)
  - [Add address to user addresses list ](#add-address-to-user-addresses-list)
  - [Remove address from user addresses list ](#remove-address-from-user-addresses-list)
  - [Get logged user addresses list ](#get-logged-user-addresses-list)

- [Categories](#categories)
  - [Create a category](#create-a-category)
  - [Get all categories](#get-all-categories)
  - [Schema Category](#schema-category)


- [product](#products)
  - [Get a single product ](#get-a-single-product)
  - [Get all products ](#get-all-products)
  - [Get all products by category](#get-all-products-by-category)
  - [Product Schema ](#product-schema)

- [Cart](#cart)
  - [Add product to cart ](#add-product-to-cart)
  - [Get logged user cart ](#get-logged-user-cart)
  - [Remove specific cart item ](#remove-specific-cart-item)
  - [Clear logged user cart ](#clear-logged-user-cart)
  - [Cart Schema ](#cart-schema)

- [Order](#order)
  - [Create Order](#create-order)
  - [Get logged user Order History](#get-logged-user-order-hostory)
  - [Get specific Order Detail ](#get-specific-order-detail)
  - [Order Schema ](#order-schema)

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`
`JWT_SECRET`


## API Authentication

Some endpoints may require authentication for example To create a create/delete, you need to register your API users and obtain an access token.

The endpoints that require authentication expect a bearer token sent in the `Authorization header`.

**Example**:

`Authorization: Bearer YOUR TOKEN`

<!--te-->

## Authentication

#### Endpoints for Authentication

---

| @Route           | @Type | @access | @desc                       |
| ---------------- | ----- | ------- | --------------------------- |
| /api/user/Me     | GET   | Private | Get Logged User             |
| /api/user/signup | POST  | Public  | Create a new user in db     |
| /api/user/login  | POST  | Public  | Authenticate a current user |

## Get Logged User

```bash
[GET] http://localhost:3000/api/user/Me
```

```json
{
  "data": {
    "_id": "63bc7cf53e721990a8cc4ff8",
    "fullname": "Ruby",
    "email": "ruby@mail.com",
    "password": "$2a$12$vJ1Yf9Jkj700doCaSZBlgudPTOLlzpkGgOlB4fUzOwaKcYyQGfGJS",
    "addresses": [],
    "createdAt": "2023-08-18T20:45:41.648Z",
    "updatedAt": "2023-08-18T20:45:41.648Z",
    "__v": 0
  }
}
```


## Login

You can do login by sending an object like the following to `/auth/login/`

```bash
[POST] http://localhost:3000/api/user/login
```

```json
{
  "email": "ruby@mail.com",
  "password": "123456"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
    "data": {
        "_id": "63bc7cf53e721990a8cc4ff8",
        "name": "Ruby",
        "email": "ruby@mail.com",
        "addresses": [],
        "createdAt": "2023-08-18T20:45:41.648Z",
        "updatedAt": "2023-08-18T20:45:41.648Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2JjN2NmNTNlNzIxOTkwYThjYzRmZjgiLCJpYXQiOjE2NzMyOTczOTYsImV4cCI6MTY4MTA3MzM5Nn0.cHnKhOCIYvWkEvS2yNYKYDrTvvUOV5GaxddTzbqYSLA"
}
```

</details>

## Sign Up

Create a user by sending user's credentials (in JSON format) in the Body of the HTTP Request. The content of the Body should look like the following:

```bash
[POST] http://localhost:3000/api/user/signup
```

```json
{
  "name": "Ruby",
  "email": "ruby@mail.com",
  "password": "123456",
  "passwordConfirm": "123456"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
    "data": {
        "name": "Ruby",
        "email": "ruby@mail.com",
        "password": "$2a$12$vJ1Yf9Jkj700doCaSZBlgudPTOLlzpkGgOlB4fUzOwaKcYyQGfGJS",
        "_id": "63bc7cf53e721990a8cc4ff8",
        "addresses": [],
        "createdAt": "2023-08-18T20:45:41.648Z",
        "updatedAt": "2023-08-18T20:45:41.648Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2JjN2NmNTNlNzIxOTkwYThjYzRmZjgiLCJpYXQiOjE2NzMyOTcxNDQsImV4cCI6MTY4MTA3MzE0NH0.FpBunPGtHG88Xi2fvJ4k-q7t3vW_ARPBpmAH-eMAmzQ"
}
```

</details>

---


## Schema User

| Attribute | Type    |
| --------- | ------- |
| fullname  | string  |
| email     | string  |
| password  | string  |
| Addresses | array   |

---

---

## Addresses

#### Endpoints for Addresses

---

Addresses Routes:

| @Route                      | @Type  | @access      | @desc                                   |
| --------------------------- | ------ | ------------ | --------------------------------------- |
| /api/user/addAddres         | POST   | Private/User | Add address to user addresses list      |
| /api/user/removeAddress:id  | DELETE | Private/User | Remove address from user addresses list |
| /api/user/getAddress        | GET    | Private/User | Get logged user addresses list          |

## Add address to user addresses list

You can Add address to user addresses list by sending an object like the following to `/api/addressess/` endpoint.

```
[POST] http://localhost:3000/api/user/addAddres
```

```json
{
  "alias": "Home",
  "details": "985 Pinnickinnick Street",
  "phone": "615-827-2462",
  "city": "Sayreville",
  "state": "Delhi",
  "postalCode": "08872"
}
```

## Remove address from user addresses list

You can Remove address from user addresses list by adding the `id` as a parameter: `/api/addressess/{id}`

```bash
[DELETE] http://localhost:3000/api/user/removeAddress{id}
```

```json
{
  "status": "success",
  "message": "Address removed successfully.",
  "data": [
    {
      "alias": "Home",
      "details": "985 Pinnickinnick Street",
      "phone": "615-827-2462",
      "city": "Sayreville",
      "state": "Delhi",
      "postalCode": "08872",
      "_id": "63b045fbdd839ae49bd78e5f"
    }
    // ..
  ]
}
```

## Get logged user addresses list

You can access the list of addresses by using the `/api/addressess` endpoint.

```
[GET] http://localhost:3000/api/user/getAddress
```

```json
{
  "status": "success",
  "results": 2,
  "data": [
    {
      "alias": "Home",
      "details": "985 Pinnickinnick Street",
      "phone": "615-827-2462",
      "city": "Sayreville",
      "state": "Delhi",
      "postalCode": "08872",
      "_id": "63b045fbdd839ae49bd78e5f"
    }
    // ..
  ]
}
```

---

## Categories

#### Endpoints for Categories

---

Category Routes:

| @Route                               | @Type  | @access       | @desc                        |
| ------------------------------------ | ------ | ------------- | ---------------------------- |
| /api/categories/add                  | POST   | Public        | Get List of Categories       |
| /api/categories/                     | GET    | Public        | Get List of Categories       |


## Create a category

You can create a new category by sending an object like the following to `/categories/`

```bash
[POST]  http://localhost:3000/api/categories/add
```

```json
{
  "name": "Dog Food",
  "imageUrl": "/categories/category-bc9c91b0-0602-4679-a90a-ec2d35dcc895-1673300203174.jpeg"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
    "data": {
        "name": "Dog Food",
        "imageUrl": "/categories/category-bc9c91b0-0602-4679-a90a-ec2d35dcc895-1673300203174.jpeg",
        "_id": "63bc88ec3e721990a8cc5064",
        "createdAt": "2023-08-18T21:36:44.017Z",
        "updatedAt": "2023-08-18T21:36:44.017Z",
        "__v": 0
    }
}
```

</details>

## Get all categories

You can access the list of categories by using the `/categories` endpoint.

```bash
[GET]  http://localhost:3000/api/categories/
```

```json
{
  "categories": [
    {
      "_id": "63bc88ec3e721990a8cc5064",
      "name": "Dog Food",
      "imageUrl": "/categories/category-bc9c91b0-0602-4679-a90a-ec2d35dcc895-1673300203174.jpeg",
      "createdAt": "2023-08-18T21:36:44.017Z",
      "updatedAt": "2023-08-18T21:36:44.017Z"
    }
    // ...
  ]
}
```



## Schema Category

| Attribute | Type   |
| --------- | ------ |
| name      | string |
| imageUrl  | string |

---

## Products

#### Endpoints for Products

---

Product Routes:

| @Route                                 | @Type  | @access       | @desc                          |
| -------------------------------------- | ------ | ------------- | ------------------------------ |
| /api/products/one:productId            | GET    | Public        | Get a single product           |
| /api/products/all                      | GET    | Public        | Get all products               |
| /api/products/category:Id              | GET    | Public        | Get all products by category   |


## Get a single product

You can get a single product by adding the `id` as a parameter: `/api/products/one/{id}`

```bash
[GET] http://localhost:3000/api/products/one/63bc8e4b3e721990a8cc5089
```

```json
{
  "data": {
    "_id": "63bc8e4b3e721990a8cc5089",
    "title": "Kibbles 'n Bits Original Savory Beef & Chicken Flavors Dry Dog Food",
    "description": "Give your pup the nutrition and flavor he loves with the Kibbles 'n Bits Original Savory Beef & Chicken Flavors Dry Dog Food. This formula packs plenty of meaty taste into a blend of crunchy kibble and soft meaty bits made with the flavors of beef and chicken. It’s loaded with high-quality protein to help support strong muscles, plus vitamins, minerals and antioxidants so it’s a complete and balanced diet for adults. Plus, it’s proudly made in the USA so it’s a satisfying meal you can feel good about serving your dog every day!\n\n",
    "countInStock": 80,
    "sold": 0,
    "price": 26.83,
    "imageUrl": {
      "/products/product-0cfe07c8-2f7e-460c-9ce0-3f405e6fea95-1673301571031-4.jpeg",
    },
    "category": {
      "name": "Dog Food"
    },
    "createdAt": "2023-08-18T21:59:39.954Z",
    "updatedAt": "2023-08-18T21:59:39.954Z",
    "__v": 0,
  }
}
```

## Get all products

You can access the list of 200 products by using the `/api/products` endpoint.

```bash
[GET] http://localhost:3000/api/products/all
```

```json
{

  "data": [
    {
      "_id": "63bc8d063e721990a8cc5085",
      "title": "Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble Adult Dry Dog Food",
      "description": "Give your furry friend a taste of the good life with the Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble Adult Dry Dog Food. With a succulent steak flavor accented with hearty vegetables, this food has everything you need to keep your dog feeling his best. It’s prepared with whole grains for healthy digestion, plus essential nutrients and omega-6 fatty acids to promote a healthy skin and luxurious coat. And perhaps best of all, the crunchy texture of the kibble helps clean his teeth, so he’s always ready for his close up. It’s the easy way to combine great-tasting food plus nutrition that promotes health and vitality into a single bowl.",
      "countInStock": 12,
      "sold": 0,
      "price": 27.78,
      "imageUrl": "/products/product-f720ed78-f7ae-4b97-984e-724fd649b526-1673301241065-cover.jpeg",
      "category": {
        "name": "Dog Food"
      },
      "createdAt": "2023-08-18T21:54:14.049Z",
      "updatedAt": "2023-08-18T21:54:14.049Z",
    }
    // ...
  ]
}
```
## Get all products by category

You can access the list of products by using the `/products/Category/{id}` endpoint.

```bash
[GET]  http://localhost:3000/api/products/Category/{id}
```

```json
{
  "data": [
    {
      "_id": "636e6bef6c34aa33724e6cd9",
      "title": "Mens Cotton Jacket",
      "description": "great outerwear jackets ...........",
      "countInStock": 20,
      "sold": 75,
      "price": 55.99,
      "category": {
        "_id": "636e61a8aa2719937c3cf0dc",
        "name": "Men's Clothing"
      },
 "imageUrl": "/products/product-f720ed78-f7ae-4b97-984e-724fd649b526-1673301241065-cover.jpeg",
      "createdAt": "2023-08-18T15:36:15.688Z",
      "updatedAt": "2023-08-18T15:36:15.688Z"
    }
    // ...
  ]
}
```


## Product Schema

| Attribute          | Type     |
| ------------------ | -------- |
| title              | string   |
| description        | string   |
| countInStock       | Number   |
| price              | Number   |
| sold               | Number   |
| imageUrl           | images   |
| category           | ObjectId |

---

## Cart

#### Endpoints for Cart

---

Cart Routes:

| @Route                | @Type  | @access      | @desc                         |
| --------------------- | ------ | ------------ | ----------------------------- |
| /api/cart/            | POST   | Private/User | Add product to cart           |
| /api/cart/            | GET    | Private/User | Get logged user cart          |
| /api/cart/:id         | DELETE | Private/User | Remove specific cart item     |
| /api/cart/            | DELETE | Private/User | Clear logged user cart        |


## Add product to cart

You can Add product to cart by sending an object like the following to `/cart/`

```bash
[POST] http://localhost:3000/api/cart/
```

```json
{
  "productId": "636e6bef6c34aa33724e6cdd",
}
```

## Get logged user cart

```bash
[GET] http://localhost:3000/api/cart
```

```json
{
  "status": "success",
  "numOfCartItems": 2,
  "data": {
    "_id": "63b08822a8808232467c2993",
    "cartItems": [
      {
        "product": "636e6bef6c34aa33724e6cdd",
        "quantity": 1,
        "price": 50,
        "_id": "63b08822a8808232467c2994"
      }
      // ...
    ],
    "totalCartPrice": 120,
    "user": "63aeed564a116b073bc4d0cf",
    "createdAt": "2023-08-18T19:06:10.762Z",
    "updatedAt": "2023-08-18T19:11:18.797Z",
    "__v": 1
  }
}
```


## Remove specific cart item

You can remove Specific Cart Item by adding the `id`as a parameter: `/api/cart/{id}`

```bash
[DELETE] http://localhost:3000/api/cart/{id}
```

## Clear logged user cart

```bash
[DELETE] http://localhost:3000/api/cart/
```


## Cart Schema

| Attribute               | Type   |
| ----------------------- | ------ |
| cartItems               | arrays |
| totalCartPrice          | Number |

```

## Order

#### Endpoints for Order

---

Order Routes:

| @Route                       | @Type  | @access      | @desc                         |
| ---------------------------- | ------ | ------------ | ----------------------------- |
| /api/order/:cartId           | POST   | Private/User | create order                  |
| /api/order/all               | GET    | Private/User | Get logged user order history |
| /api/order/:orderId          | GET    | Private/User | Get specific Order Detail     |


## Create order

You can Add product to cart by sending an object like the following to `/cart/`

```bash
[POST] http://localhost:3000/api/cart/:cartId
```

```json
{
  "status": "success",
  "data": {
    "_id": "63b08822a8808232467c2993",
    "cartItems": [
      {
        "product": "636e6bef6c34aa33724e6cdd",
        "quantity": 1,
        "price": 50,
        "_id": "63b08822a8808232467c2994"
      }
      // ...
    ],
    "shippingAddress": {
      "alias": "Home",
      "details": "985 Pinnickinnick Street",
      "phone": "615-827-2462",
      "city": "Sayreville",
      "state": "Delhi",
      "postalCode": "08872",
    },
    "paymentMethodType": "cash",
    "isPaid": false,
    "isDelivered":false,
    "totalCartPrice": 120,
    "user": "63aeed564a116b073bc4d0cf",
    "createdAt": "2023-08-18T19:06:10.762Z",
    "updatedAt": "2023-08-18T19:11:18.797Z",
    "__v": 1
  }
}
```

## Get All order history

```bash
[GET] http://localhost:3000/api/order/all
```

```json
{
  "status": "success",
  "data": [
    {
    "_id": "63b08822a8808232467c2993",
    "cartItems": [
      {
        "product": "636e6bef6c34aa33724e6cdd",
        "quantity": 1,
        "price": 50,
        "_id": "63b08822a8808232467c2994"
      }
      // ...
    ],
    "shippingAddress": {
      "alias": "Home",
      "details": "985 Pinnickinnick Street",
      "phone": "615-827-2462",
      "city": "Sayreville",
      "state": "Delhi",
      "postalCode": "08872",
    },
    "paymentMethodType": "cash",
    "isPaid": false,
    "isDelivered":false,
    "totalCartPrice": 120,
    "user": "63aeed564a116b073bc4d0cf",
    "createdAt": "2023-08-18T19:06:10.762Z",
    "updatedAt": "2023-08-18T19:11:18.797Z",
    "__v": 1
  },
 // ...
]
}
```


## Get specific Order Detail

You can remove Specific Cart Item by adding the `id`as a parameter: `/api/cart/{id}`

```bash
[GET] http://localhost:3000/api/order/"63b08822a8808232467c2993"
```

```json
{
  "status": "success",
  "data": {
    "_id": "63b08822a8808232467c2993",
    "cartItems": [
      {
        "product": "636e6bef6c34aa33724e6cdd",
        "quantity": 1,
        "price": 50,
        "_id": "63b08822a8808232467c2994"
      }
      // ...
    ],
    "shippingAddress": {
      "alias": "Home",
      "details": "985 Pinnickinnick Street",
      "phone": "615-827-2462",
      "city": "Sayreville",
      "state": "Delhi",
      "postalCode": "08872",
    },
    "paymentMethodType": "cash",
    "isPaid": false,
    "isDelivered":false,
    "totalCartPrice": 120,
    "user": "63aeed564a116b073bc4d0cf",
    "createdAt": "2023-08-18T19:06:10.762Z",
    "updatedAt": "2023-08-18T19:11:18.797Z",
    "__v": 1
  }
}
```


## Order Schema

| Attribute               | Type   |
| ----------------------- | ------ |
| user                    |ObjectId|
| cartItems               | Array  |
| shippingAddress         | Object |
| totalOrderPrice         | Number |
| paymentMethodType       | String |
| isPaid                  |Boolean | 
| paidAt                  | Date   | 
| isDelivered             |Boolean | 
| deliveredAt             | Date   | 
| totalCartPrice          | Number |

```



