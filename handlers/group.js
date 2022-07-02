
const GroupModel = require("../models/GroupModel");
const GroupMembers = require("../models/GroupMember");
const Contribution = require("../models/Contribution");
const merrygoroundModel = require("../models/merryGoRound");


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

// create a new merry go round instance

exports.merrygoround = (req, res) => {
    let newGroup = new merrygoroundModel({
        groupName: req.body.groupName,
        membersEmail: req.body.membersEmail,
        sessions: req.body.sessions,
        interval:req.body.interval,
    })
    newGroup.save().then((newGroup) => {
        res.status(201).json({ "responseStatusCode": 201, "responseDescription": "new merrygoround session created successfully", "data": newGroup })
    }).catch((err) => {
       // console.log(err)
        res.status(401).json({ "responseStatusCode": 401, "responseDescription": "Client side error, check on your request body", "data": err })
    })
}



// gets all merry go rounds in a group

exports.getmerrygoround = (req, res) => {
    merrygoroundModel.find()
        .then((data) => {
            res.status(200).json({ "responseStatusCode": 200, "responseDescription": "all merry go rounds fetched successfully!", "data": data });
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ "responseStatusCode": 500, "responseDescription": "we encountered an error while fetching the all groups!", "error": err });
        })

}


// gets all contributions
exports.getAllContributions = (req, res) => {
    Contribution.find()
        .then((data) => {
            res.status(200).json({ "responseStatusCode": 200, "responseDescription": "all contributions fetched successfully!", "data": data });
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ "responseStatusCode": 500, "responseDescription": "we encountered an error while fetching the all groups!", "error": err });
        })

}

// creates new contributions

exports.addContribution = (req, res) => {
    let newContribution = new Contribution({
        groupName: req.body.groupName,
        contributorEmail: req.body.contributorEmail,
        receiverEmail: req.body.receiverEmail,
        merryGoRoundCode:req.body.merryGoRoundCode,
        session:req.body.session,
        amount:req.body.amount,
    })
    newContribution.save().then((newContribution) => {
        res.status(201).json({ "responseStatusCode": 201, "responseDescription": "new contribution created successfully", "data": newContribution })
       
    }).catch( (err)=>{
        res.status(401).json({ "responseStatusCode": 401, "responseDescription": "Client side error, check on your request body", "data": err })

    });
}



exports.addMember = (req, res) => {
    let addedMember = new GroupMembers({
        groupName: req.body.groupName,
        sessionNo: req.body.sessionNo,
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

exports.getSpecificGroupMembers = (req, res) => {
    GroupMembers.find({ groupName: req.body.groupName }, (err, user) => {
        console.log(user);
        if (err) {
            res.status(200).json({ "responseStatusCode": 401, "responseDescription": "we encountered an error while logging you in!", "error": err });

        } else {
            if (user.length == 0) {
                res.status(200).json({ "responseStatusCode": 401, "responseDescription": "The group has no members", });

            } else {
                res.status(200).json({ "responseStatusCode": 200, "responseDescription": "Members loaded successfully", "data": user });

            }

        }

    }); 
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

