import { Cart } from "../Models/Cart.js";

// Add item to cart
export const addToCart = async (req, res) => {
  const { productId, quantity, price, title } = req.body;
  const userId = req.user._id;
let cart = await Cart.findOne({ userId });
  try {
    
    if (!cart) {
        cart = new Cart({userId, items: []});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  const itemIndex = cart.items.findIndex((item) => item.productId.toString() == productId
)
  if (itemIndex > -1) {
    // Item already exists in the cart, update quantity
    cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price += price * quantity;

  }else {
    // Item does not exist in the cart, add new item
    cart.items.push({ productId, quantity, price, title });
  }
  await cart.save();
  res.status(200).json({ message: "Item added to cart successfully", cart });

}  

// get user cart
export const userCart = async (req, res) => {
  const userId = req.user._id;

  let cart = await Cart.findOne({userId});
  if (!cart) return res.status(404).json({ message: "Cart not found", success: false });

  res.status(200).json({ message: "Cart fetched successfully", cart });
}; 

// Remove product from cart
export const removeProductFromCart = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found", success: false });

    cart.items = cart.items.filter((item)=>item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json({ message: "Product removed from cart successfully", Cart });
};

// clear cart
export const clearCart = async (req, res) => {
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({items:[]});
  }else {
    cart.items = [];
  }
  await cart.save();
  res.status(200).json({ message: "Cart cleared successfully", cart });

}  

// decrease product quantity in cart
export const decreaseProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;
let cart = await Cart.findOne({ userId });
  try {
    
    if (!cart) {
        cart = new Cart({userId, items: []});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  const itemIndex = cart.items.findIndex((item) => item.productId.toString() == productId
)
  if (itemIndex > -1) {
    const item = cart.items[itemIndex];
    if (item.quantity>quantity){
      const pricePerUnit = item.price / item.quantity;
      // Item already exists in the cart, update quantity
      item.quantity -= quantity;
      item.price -= pricePerUnit * quantity;
    }else{
      cart.items.splice(itemIndex, 1); // Remove item if quantity is less than or equal to 0
    }

  }else {
    return res.json({message: "Item not found in cart!"});
  }
  await cart.save();
  res.status(200).json({ message: "Item quantity decreased Successfully...!", cart });

}