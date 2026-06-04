# Bug Report

This document contains all bugs identified during testing and code review.

---

## 1. CORS Origin Configuration

### Issue

The backend CORS configuration contains an extra `/` at the end of the frontend URL.

### Current

```js
origin: "http://localhost:5173/";
```

### Fix

```js
origin: "http://localhost:5173";
```

---

## 2. Login Form Password Field

### Issue

Incorrect input field name used in the Login page.

### Current

```jsx
name="pass"
```

### Fix

```jsx
name="password"
```

---

## 3. JWT Verification Secret

### File

`authController.js`

### Issue

Incorrect environment variable used for token verification.

### Current

```js
const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
```

### Fix

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

---

## 4. Product API Endpoint

### Issue

Incorrect API endpoint used in `handleProductSubmit`.

### Current

```js
/product
```

### Fix

```js
/products
```

---

## 5. Product Table Category Styling

### Issue

The category column is missing a `className`, resulting in inconsistent styling.

### Fix

Add the appropriate `className` to the category table cell.

---

## 6. Inventory Lookup Logic

### File

`getProduct`

### Issue

`filter()` is used when only a single inventory record is required.

### Current

```js
const baseInv = inventories.filter(
  (i) =>
    i.product.toString() === product._id.toString() &&
    !i.variantSku
);
```

### Fix

```js
const baseInv = inventories.find(
  (i) =>
    i.product.toString() === product._id.toString() &&
    !i.variantSku
);
```

### Reason

* `filter()` returns an array.
* `find()` returns a single object.
* Better performance and cleaner logic.

---

## 7. Order API Endpoint

### Issue

Incorrect endpoint used in `handleOrderSubmit`.

### Current

```js
/roder
```

### Fix

```js
/orders
```

---

## 8. Inventory Validation in Order Creation

### File

`orderController.js`

### Issue #1

Current:

```js
if (!inventoryRecord || inventoryRecord.quantity >= quantity)
```

Fix:

```js
if (!inventoryRecord || inventoryRecord.quantity < quantity)
```

### Issue #2

Current:

```js
if (variant.stock > quantity)
```

Fix:

```js
if (variant.stock < quantity)
```

### Reason

The validation should fail only when available stock is less than the requested quantity.

---

## 9. Dashboard Order Date Styling

### Issue

Order date column is missing a `className`.

### Fix

Add the required styling class for consistent table formatting.

---

## 10. Dashboard Inventory Table Text Color

### Issue

Inventory table text color class is missing.

### Fix

```jsx
className="text-white"
```

---

## 11. Dashboard Profile Section Styling

### Issue

Profile section text color is not consistent with the dashboard theme.

### Fix

Update text color classes to improve readability and UI consistency.

---

## 12. Authentication Context Token Storage Issue

### File

`AuthContext.js`

### Issue

The frontend stores the wrong token value in Local Storage after Login and Registration.

### Backend Response

```json
{
  "_id": "6a204867d63c79b2deb22611",
  "username": "praful",
  "email": "praful@gmail.com",
  "password": "$2b$10$1gHQ7HVr5LFXPofkOv6I1eq04Q4yLsqg0.gWtPVQM71QxRfo99nXe",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

The backend returns the token as:

```js
response.data.accessToken
```

However, the frontend is storing:

```js
localStorage.setItem("token", response.data.token);
```

Since `response.data.token` does not exist, the value stored in Local Storage becomes `undefined`.

### Fix

Update both Login and Register functions:

```js
localStorage.setItem("token", response.data.accessToken);
```

### Impact

* User session is not persisted correctly.
* Protected routes may fail after page refresh.
* Users may be logged out unexpectedly.
* API requests may be sent without a valid token.

---

## 13. Overview Section Customer Name Visibility Issue

### File

Dashboard → Overview Section

### Issue

Customer names are not visible because the table cell is missing a text color class.

### Current

```jsx
<TableCell>{order.customerName}</TableCell>
```

### Fix

```jsx
<TableCell className="text-white">
  {order.customerName}
</TableCell>
```


---



## Bugs List

1. CORS Origin Configuration
2. Login Password Field Name
3. JWT Secret Verification
4. Product API Endpoint
5. Product Table Category Styling
6. Inventory Lookup Logic
7. Order API Endpoint
8. Order Inventory Validation Logic
9. Dashboard Order Date Styling
10. Dashboard Inventory Table Text Color
11. Dashboard Profile Text Color
12. Authentication Context Token Storage
13. Overview Customer Name Visibility
