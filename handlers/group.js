const GroupModel = require("../models/GroupModel");
const GroupMembers = require("../models/GroupMember");
const Contribution = require("../models/Contribution");
const merrygoroundModel = require("../models/merryGoRound");
const GroupRequests = require("../models/groupRequests");
const WelfareKit = require("../models/WelfareKit");
const WelfareKitTransaction = require("../models/welfareKitTransaction");

let unirest = require("unirest");

exports.creategroup = (req, res) => {
  let newGroup = new GroupModel({
    groupName: req.body.groupName,
    Admin: req.body.Admin,
    groupDescription: req.body.groupDescription,
    deleted: false,
  });
  newGroup
    .save()
    .then((newGroup) => {
      res.status(201).json({
        responseStatusCode: 201,
        responseDescription: "Group was created successfully",
        data: newGroup,
      });
    })
    .catch((err) => {
      // console.log(err)
      res.status(401).json({
        responseStatusCode: 401,
        responseDescription: "Client side error, check on your request body",
        data: err,
      });
    });
};

// accept membership requests
// AuthModel.find({ username: req.body.username, password: req.body.password }, (err, user) => {
//   console.log(user);
//   if (err) {
//       res.status(200).json({ "responseStatusCode": 401, "responseDescription": "we encountered an error while logging you in!", "error": err });

//   } else {
//       if (user.length == 0) {
//           res.status(200).json({ "responseStatusCode": 401, "responseDescription": "YOu provided Wrong credentials", });

//       } else {
//           res.status(200).json({ "responseStatusCode": 200, "responseDescription": "Logging in successfully", "data": user });

//       }

//   }

// });

exports.accept_membership_request = (req, res) => {
  GroupRequests.find({ _id: req.body.request_id }, (err, data) => {
    console.log(data[0]);
    if (err) {
      res.status(200).json({
        responseStatusCode: 401,
        responseDescription: "we encountered an error while sending a request!",
        error: err,
      });
    } else {
      if (data.length == 0) {
        res.status(200).json({
          responseStatusCode: 401,
          responseDescription:
            "No membership request found with the specified ID",
        });
      } else {
        // add member to group

        let addedMember = new GroupMembers({
          groupName: data[0].groupName,
          sessionNo: 1,
          memberEmail: data[0].user_email,
        });
        addedMember
          .save()
          .then((addedMember) => {
            // delete request

            GroupRequests.deleteOne(
              { _id: req.body.request_id },
              (err, data) => {
                res.status(201).json({
                  responseStatusCode: 201,
                  responseDescription:
                    "membership request approved and member joined successfully",
                  data: addedMember,
                });
              }
            );

            // end of delete request
          })
          .catch((err) => {
            // console.log(err)
            res.status(401).json({
              responseStatusCode: 401,
              responseDescription:
                "Client side error, check on your request body",
              data: err,
            });
          });
      }
    }
  });
};

// view membership requests

exports.view_membership_request = (req, res) => {
  GroupRequests.find()
    .then((data) => {
      res.status(200).json({
        responseStatusCode: 200,
        responseDescription:
          "all group membership requests fetched successfully!",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        responseStatusCode: 500,
        responseDescription:
          "we encountered an error while fetching the all groups!",
        error: err,
      });
    });
};

// send a membership request for the admin to approve

exports.send_membership_request = (req, res) => {
  let newGroupRequest = new GroupRequests({
    groupName: req.body.groupName,
    user_email: req.body.user_email,
  });
  newGroupRequest
    .save()
    .then((newGroupRequest) => {
      res.status(201).json({
        responseStatusCode: 201,
        responseDescription: "new group request sent successfully",
        data: newGroupRequest,
      });
    })
    .catch((err) => {
      // console.log(err)
      res.status(401).json({
        responseStatusCode: 401,
        responseDescription: "Client side error, check on your request body",
        data: err,
      });
    });
};

// create a new merry go round instance

exports.merrygoround = (req, res) => {
  let newGroup = new merrygoroundModel({
    groupName: req.body.groupName,
    membersEmail: req.body.membersEmail,
    sessions: req.body.sessions,
    interval: req.body.interval,
  });
  newGroup
    .save()
    .then((newGroup) => {
      res.status(201).json({
        responseStatusCode: 201,
        responseDescription: "new merrygoround session created successfully",
        data: newGroup,
      });
    })
    .catch((err) => {
      // console.log(err)
      res.status(401).json({
        responseStatusCode: 401,
        responseDescription: "Client side error, check on your request body",
        data: err,
      });
    });
};

// gets all merry go rounds in a group

exports.getmerrygoround = (req, res) => {
  merrygoroundModel
    .find()
    .then((data) => {
      res.status(200).json({
        responseStatusCode: 200,
        responseDescription: "all merry go rounds fetched successfully!",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        responseStatusCode: 500,
        responseDescription:
          "we encountered an error while fetching the all groups!",
        error: err,
      });
    });
};

// gets all contributions
exports.getAllContributions = (req, res) => {
  Contribution.find()
    .then((data) => {
      res.status(200).json({
        responseStatusCode: 200,
        responseDescription: "all contributions fetched successfully!",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        responseStatusCode: 500,
        responseDescription:
          "we encountered an error while fetching the all groups!",
        error: err,
      });
    });
};

// creates new contributions

exports.addContribution = (req, res) => {
  // make mpesa deposit

  // add a new contribution
  let newContribution = new Contribution({
    groupName: req.body.groupName,
    contributorEmail: req.body.contributorEmail,
    receiverEmail: req.body.receiverEmail,
    merryGoRoundCode: req.body.merryGoRoundCode,
    session: req.body.session,
    amount: req.body.amount,
  });
  newContribution
    .save()
    .then((newContribution) => {
      res.status(201).json({
        responseStatusCode: 201,
        responseDescription: "new contribution created successfully",
        data: newContribution,
      });
    })
    .catch((err) => {
      res.status(401).json({
        responseStatusCode: 401,
        responseDescription: "Client side error, check on your request body",
        data: err,
      });
    });
};

exports.addMember = (req, res) => {
  let addedMember = new GroupMembers({
    groupName: req.body.groupName,
    sessionNo: req.body.sessionNo,
    memberEmail: req.body.memberEmail,
    active: false,
  });
  addedMember
    .save()
    .then((addedMember) => {
      res.status(201).json({
        responseStatusCode: 201,
        responseDescription: "member joined successfully",
        data: addedMember,
      });
    })
    .catch((err) => {
      // console.log(err)
      res.status(401).json({
        responseStatusCode: 401,
        responseDescription: "Client side error, check on your request body",
        data: err,
      });
    });
};

exports.getResource = (req, res) => {
  GroupModel.findById(req.params.id, (err, user) => {
    if (user) {
      res.status(200).json({
        responseStatusCode: 200,
        responseDescription: "Resource fetch success!",
        data: user,
      });
    } else {
      res.status(404).json({
        responseStatusCode: 404,
        responseDescription: "no resource found with the supplied id",
        data: err,
      });
    }
  });
};

exports.getSpecificGroupMembers = (req, res) => {
  GroupMembers.find({ groupName: req.body.groupName }, (err, user) => {
    console.log(user);
    if (err) {
      res.status(200).json({
        responseStatusCode: 401,
        responseDescription: "we encountered an error while logging you in!",
        error: err,
      });
    } else {
      if (user.length == 0) {
        res.status(200).json({
          responseStatusCode: 401,
          responseDescription: "The group has no members",
        });
      } else {
        res.status(200).json({
          responseStatusCode: 200,
          responseDescription: "Members loaded successfully",
          data: user,
        });
      }
    }
  });
};

exports.getAllGroups = (req, res) => {
  GroupModel.find()
    .then((data) => {
      res.status(200).json({
        responseStatusCode: 200,
        responseDescription: "all groups fetched success!",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        responseStatusCode: 500,
        responseDescription:
          "we encountered an error while fetching the all groups!",
        error: err,
      });
    });
};

exports.getAllDeletedResources = (req, res) => {
  GroupModel.find()
    .where("deleted")
    .equals(true)
    .then((data) => {
      res.status(200).json({
        responseStatusCode: 200,
        responseDescription: "all deleted resources fetch success!",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        responseStatusCode: 500,
        responseDescription:
          "we encountered an error while fetching the agent wallets!",
        error: err,
      });
    });
};

exports.SoftdeleteGroupModel = (req, res) => {
  let updateRequestBody = {
    deleted: true,
  };
  GroupModel.findByIdAndUpdate({ _id: req.body.id }, updateRequestBody)
    .then((data) => {
      res.status(200).json({
        responseStatusCode: 200,
        responseDescription: "Resource soft deleted successfully!",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        responseStatusCode: 500,
        responseDescription:
          "we encountered an error while deleting your resource! supply a correct ID",
        error: err,
      });
    });
};

// mpesa logi

exports.mpesa = (req, resp) => {
  let consumer_key = "ajygDrto5O0hHwATKaPfjRYYd7EN3J1G";
  let consumer_secret = "UYV3tFRW0NGMsCwh";

  let auth =
    "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  // get access token
  let unirest = require("unirest");
  let requ = unirest(
    "GET",
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  )
    .headers({ Authorization: "Bearer " + auth })
    .send()
    .end((res) => {
      if (res.error) {
        console.log(res.error);
        let saferror = res.error;
        resp.status(200).json({
          responseStatusCode: 200,
          responseDescription: "an error occured",
          error: saferror,
        });
      } //throw new Error(res.error);
      //console.log(res.raw_body);
      else {
        resp.status(200).json({
          responseStatusCode: 200,
          responseDescription: "successfully initiated mpesa payment",
        });
      }
    });

  // end of access token
};

// create a welfare_kit

exports.create_welfare_kit = (req, res) => {
  let newWelfareKit = new WelfareKit({
    groupName: req.body.groupName,
    welfareWallet: req.body.welfareWallet,
  });
  newWelfareKit
    .save()
    .then((newWelfareKit) => {
      res.status(201).json({
        responseStatusCode: 201,
        responseDescription: "WelfareKit was created successfully",
        data: newWelfareKit,
      });
    })
    .catch((err) => {
      // console.log(err)
      res.status(401).json({
        responseStatusCode: 401,
        responseDescription: "Client side error, check on your request body",
        data: err,
      });
    });
};

// create a wallet kit transaction

exports.create_welfare_kit_transaction = (req, res) => {
  let newWelfareKit = new WelfareKitTransaction({
    WelfareId: req.body.WelfareId,
    amount: req.body.amount,
    senderEmail: req.body.senderEmail,
  });
  newWelfareKit
    .save()
    .then((newWelfareKit) => {
      // update kit balance

      WelfareKit.find({ _id: req.body.WelfareId }, (err, data) => {
        if (err) {
          res.status(200).json({
            responseStatusCode: 401,
            responseDescription:
              "we encountered an error while sending a request!",
            error: err,
          });
        } else {
          if (data.length == 0) {
            res.status(200).json({
              responseStatusCode: 401,
              responseDescription: "No welfare kit found with the specified ID",
            });
          } else {
            WelfareKit.updateOne(
              { _id: req.body.WelfareId },
              { welfareWallet: data[0].welfareWallet + req.body.amount },
              (err, data) => {
                if (err) throw err;
                console.log("1 document updated");

                res.status(201).json({
                  responseStatusCode: 201,
                  responseDescription:
                    "WelfareKit Transaction was created successfully",
                  data: newWelfareKit,
                });
              }
            );
          }
        }
      });
    })
    .catch((err) => {
      // console.log(err)
      res.status(401).json({
        responseStatusCode: 401,
        responseDescription: "Client side error, check on your request body",
        data: err,
      });
    });
};
