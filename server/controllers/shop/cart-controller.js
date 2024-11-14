import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body; //Getting all the information

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data provided",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      }); //If product is not present
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    } //If there's no item in the cart. add the cart

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    ); //Checking whether the Product is present in the Cart

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } //If not present then push the product into the cart
    else {
      cart.items[findCurrentProductIndex].quantity += 1;
    } //If present then increase the quantity by one

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is Mandatory",
      }); //If userId is not present
    }

    const cart = await Cart.findOne({ userId }).populate({
      //.populate is
      //used to join and retrieve data from related collections. It is joining image,title,price and salePrice from the Product collection
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Not found!",
      }); //If Cart is not present
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    ); //If we add any product that the admin might have deleted then it will filter it out hence providing synchronization
    // Population Failure: When you use the .populate() method in your query, if the productId no longer exists in the Product collection (because it was deleted), the populated productId field will be null.
    //That’s how Mongoose indirectly reflects that a product has been deleted.
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    } //Saving the non null Items

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    })); //Returning the response

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body; //Getting all the information

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data provided",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Not found!",
      }); //If Cart is not present
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart Item is not present",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    })); //Returning the response

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data provided",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      //.populate is
      //used to join and retrieve data from related collections. It is joining image,title,price and salePrice from the Product collection
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Not found!",
      }); //If Cart is not present
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    })); //Returning the response

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export { addToCart, fetchCartItems, updateCartItemQty, deleteCartItem };
