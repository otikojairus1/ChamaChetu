
const GroupModel = require("../models/GroupModel");
const GroupMembers = require("../models/GroupMember");


exports.create = (req, res) => {
    let newGroup = new GroupModel({
        groupName: req.body.groupName,
        Admin: req.body.Admin,
        groupDescription: req.body.groupDescription,
        deleted: false
    })
    newGroup.save().then((newGroup) => {
        res.status(201).json({ "responseStatusCode": 201, "responseDescription": "Group was created successfully", "data": newGroup })
    }).catch((err) => {
       // console.log(err)
        res.status(401).json({ "responseStatusCode": 401, "responseDescription": "Client side error, check on your request body", "data": err })
    })
}

exports.addMember = (req, res) => {
    let addedMember = new GroupMembers({
        groupName: req.body.groupName,
        memberEmail: req.body.memberEmail,
        active: false
    })
    addedMember.save().then((addedMember) => {
        res.status(201).json({ "responseStatusCode": 201, "responseDescription": "member joined successfully", "data": addedMember })
    }).catch((err) => {
       // console.log(err)
        res.status(401).json({ "responseStatusCode": 401, "responseDescription": "Client side error, check on your request body", "data": err })
    })
}


exports.getResource = (req, res) => {
    GroupModel.findById(req.params.id, (err, user) => {
        if (user) {
            res.status(200).json({ "responseStatusCode": 200, "responseDescription": "Resource fetch success!", "data": user });
        } else {
            res.status(404).json({ "responseStatusCode": 404, "responseDescription": "no resource found with the supplied id", data: err });
        }

    })

}


exports.getAllGroups = (req, res) => {
    GroupModel.find()
        .then((data) => {
            res.status(200).json({ "responseStatusCode": 200, "responseDescription": "all groups fetched success!", "data": data });
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ "responseStatusCode": 500, "responseDescription": "we encountered an error while fetching the all groups!", "error": err });
        })

}

exports.getAllDeletedResources = (req, res) => {
    GroupModel.find().where('deleted').equals(true)
        .then((data) => {
            res.status(200).json({ "responseStatusCode": 200, "responseDescription": "all deleted resources fetch success!", "data": data });
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ "responseStatusCode": 500, "responseDescription": "we encountered an error while fetching the agent wallets!", "error": err });
        })

}

exports.SoftdeleteGroupModel = (req, res) => {
    let updateRequestBody = {
        "deleted": true,
    }
    GroupModel.findByIdAndUpdate({_id :req.body.id}, updateRequestBody)
        .then((data) => {
            res.status(200).json({ "responseStatusCode": 200, "responseDescription": "Resource soft deleted successfully!", "data": data });
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ "responseStatusCode": 500, "responseDescription": "we encountered an error while deleting your resource! supply a correct ID", "error": err });
        })
}

