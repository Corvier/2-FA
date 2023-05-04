const Router = require('express');
const speakyeasy = require('speakeasy');
const qrcode = require('qrcode');

const router = Router();

router.get("/api", (req, res) => {
    res.json({message: 'Welcome to the two factor authentication'});
});


router.get("/api/register", (req, res) => {
    // generamos el secret authenticator
    const secret = speakyeasy.generateSecret({
        "issuer": "victor.ruiz@correo.com",
        "name": "DevRuiz"

    });

    // generamos el qrcode
    qrcode.toDataURL(secret.otpauth_url, (err, data) => {
        if (err) throw err

        console.log("secret: ", secret)
        res.render("qr", {secret, data});
    });
});

router.post("/api/verify", (req, res) => {
    const verified = speakyeasy.totp.verify({
        secret: req.body.secret,
        encoding: 'ascii',
        token: req.body.token
    });

    if (verified) {
        res.json({verified, message: "Usted esta verificado"});
    } else {
        res.json({verified, message: "Usted no se pude verificar."});
    }
});


module.exports = router;