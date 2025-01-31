const express = require('express');
const router = express.Router();

const {login , signUp , Student , Admin} = require("../Controller/controller")
const {auth , isStudent , isAdmin} = require("../MiddleWare/Auth")

router.post("/login", login);
router.post("/signup", signUp);

router.get("/test",auth, (req,res) => {
    res.json({
        message: "This is a protected route",
        user: req.user
    })
})
router.get("/student",auth , isStudent , Student)
router.get("/admin",auth , isAdmin , Admin)

module.exports = router;