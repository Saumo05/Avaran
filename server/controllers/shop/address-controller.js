import Address from "../../models/Address.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, state, country, notes } =
      req.body;

    if (
      !userId ||
      !address ||
      !city ||
      !pincode ||
      !phone ||
      !state ||
      !country
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      state,
      country,
      notes,
      phone,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error Adding Address",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserID is required",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(201).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error Fetching Address",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "UserID and AddressID is required",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.state(404).json({
        success: false,
        message: "Address could not be found !!!",
      });
    }

    res.status(201).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error Editing Address",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "UserID and AddressID is required",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.state(404).json({
        success: false,
        message: "Address could not be found !!!",
      });
    }

    res.status(201).json({
      success: true,
      message: "Address Deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error Deleting Address",
    });
  }
};

export { addAddress, editAddress, deleteAddress, fetchAllAddress };
