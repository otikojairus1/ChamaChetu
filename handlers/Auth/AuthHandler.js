
const AuthModel = require("../../models/Auth/Auth");
// registration endpoint
exports.AddUser = (req, res) => {
    let user = new AuthModel({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
    })
    user.save().then((user) => {
        res.status(200).json({ "responseStatusCode": 201, "responseDescription": "User was created successfully", "data": user })
    }).catch((err) => {
        // console.log(err)
        res.status(200).json({ "responseStatusCode": 401, "responseDescription": "Client side error, check on your request body", "data": err })
    })
}
// login endpoint
exports.login = (req, res) => {
    AuthModel.find({ email: req.body.email, password: req.body.password }, (err, user) => {
        console.log(user);
        if (err) {
            res.status(200).json({ "responseStatusCode": 401, "responseDescription": "we encountered an error while logging you in!", "error": err });

        } else {
            if (user.length == 0) {
                res.status(200).json({ "responseStatusCode": 401, "responseDescription": "YOu provided Wrong credentials", });

            } else {
                res.status(200).json({ "responseStatusCode": 200, "responseDescription": "Logging in successfully", "data": user });

            }

        }

    }); 
}

