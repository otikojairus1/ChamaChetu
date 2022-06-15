
const ExampleModel = require("../models/ExampleModel");
exports.AddResources = (req, res) => {
    let addedResource = new ExampleModel({
        field1: req.body.fieldOne,
        field2: req.body.fieldTwo,
        field3: req.body.fieldThree,
        deleted: false
    })
    addedResource.save().then((addedResource) => {
        res.status(201).json({ "responseStatusCode": 201, "responseDescription": "Resources was created successfully", "data": addedResource })
    }).catch((err) => {
       // console.log(err)
        res.status(401).json({ "responseStatusCode": 401, "responseDescription": "Client side error, check on your request body", "data": err })
    })
}

exports.getResource = (req, res) => {
    ExampleModel.findById(req.params.id, (err, user) => {
        if (user) {
            res.status(200).json({ "responseStatusCode": 200, "responseDescription": "Resource fetch success!", "data": user });
        } else {
            res.status(404).json({ "responseStatusCode": 404, "responseDescription": "no resource found with the supplied id", data: err });
        }

    })

}



exports.getAllResources = (req, res) => {
    ExampleModel.find()
        .then((data) => {
            res.status(200).json({ "responseStatusCode": 200, "responseDescription": "all resources fetched success!", "data": data });
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ "responseStatusCode": 500, "responseDescription": "we encountered an error while fetching the agent wallets!", "error": err });
        })

}

exports.getAllDeletedResources = (req, res) => {
    ExampleModel.find().where('deleted').equals(true)
        .then((data) => {
            res.status(200).json({ "responseStatusCode": 200, "responseDescription": "all deleted resources fetch success!", "data": data });
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ "responseStatusCode": 500, "responseDescription": "we encountered an error while fetching the agent wallets!", "error": err });
        })

}

exports.SoftdeleteExampleModel = (req, res) => {
    let updateRequestBody = {
        "deleted": true,
    }
    ExampleModel.findByIdAndUpdate({_id :req.body.id}, updateRequestBody)
        .then((data) => {
            res.status(200).json({ "responseStatusCode": 200, "responseDescription": "Resource soft deleted successfully!", "data": data });
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ "responseStatusCode": 500, "responseDescription": "we encountered an error while deleting your resource! supply a correct ID", "error": err });
        })
}

