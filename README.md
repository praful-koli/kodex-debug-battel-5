1. cors origin: 'http://localhost:5173/ add add extra / at the end
2. in fronend : Login page invalid input name filed name="pass" to name="password"

3.in authController line number 14 const decoded = jwt.verify(token, process.env.JWT_SECRET); // change JWT_ACCESS_TOKEN TO JWT_SECRET

4.in frontend handleProductSubmit api endpoint porduct to porducts

5.in porduct table category classNmae is missing

6.in backend getProduct
const baseInv = inventories.find(i => i.product.toString() === product.\_id.toString() && !i.variantSku );
instant using filter use find filter return array find return single object

7. in frontend handleOrderSubmit wrong api endpont /roder change to /roders

   8.in backend orderController createOrder in condition if (!inventoryRecord || inventoryRecord.quantity >= quantity)
   change to the if (!inventoryRecord || inventoryRecord.quantity < quantity)  
   also this if (variant.stock > quantity) tp change if (variant.stock < quantity)

9.in frontend DashBord section order date table classNme is missing

10.in frontend DashBoard section inventroy table classNmae="text-white"  is missing
