const express = require('express');
const router = express.Router();
const upload = require('../helper/multer')
const admin_token = require('../middleware/admin.middleware')
const {
    home,
    login,
    registerPost,
    loginPost,
    register,
    formElenents,
    formElenentsPost,
    deletes,
    mail,
    conformOTPPost
} = require('../controller/admincontroller')

// router.get('/register',register)
// router.post('/register', registerPost)
router.get('/login', login)
router.post('/login', loginPost)
router.get('/formElenents',admin_token, formElenents)
router.post('/formElenents',admin_token,upload.single('img'), formElenentsPost)
router.get('/delete/:id',admin_token, deletes)


router.post('/mail', mail)
router.post('/conformOTP', conformOTPPost)

router.get('/home',admin_token, home)
router.get('/logout',(req,res)=>{
    res.cookie("jwt","");
    res.clearCookie();
    res.redirect('/admin/login');
})


module.exports = router