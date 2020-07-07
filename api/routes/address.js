const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const AddressControllers = require('../controllers/address')

// dang ki dia chi moi

router.post("/", checkAuth, AddressControllers.create_address);

// Lay dia chi cua thanh vien

router.get("/", checkAuth, AddressControllers.get_user_address);

// Lay ten cac nuoc tren the gioi

router.get("/city", AddressControllers.get_city_address);

// Chinh sua dia chi

router.put("/:id", checkAuth, AddressControllers.edit_address);

// Xoa dia chi User

router.delete("/:id", checkAuth, AddressControllers.delete_address);

// Lấy thông tin địa chỉ

router.get("/:id", checkAuth, AddressControllers.get_address_by_id);

// Set dia chi mac dinh

router.put("/set/default", checkAuth, AddressControllers.setDefaultAddress)

module.exports = router;
