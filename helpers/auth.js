var admin = require("firebase-admin");

var serviceAccount = require("../config/firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let authorized = true;

exports.authCheck = async (req, res, next = (f) => f) => {
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    console.log("CURRENT USER", currentUser);
    return currentUser;
  } catch (error) {
    console.log("AUTH CHECK ERROR", error);
    throw new Error("Invalid or expired token");
  }
  //if nothing is passed next is a default function.
  //   if (!req.headers.authtoken) throw new Error("Unauthorized");
  //   const valid = req.headers.authtoken === "secret";
  //   console.log("REQ", req);
  //   console.log("HEADERS", req.headers);
  //   console.log("AUTHTOKEN", req.headers.authtoken);
  //   if (!valid) {
  //     throw new Error("Unauthorized");
  //   } else {
  //     next();
  //   }
};
