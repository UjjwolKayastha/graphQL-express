let authorized = false;

exports.authCheck = (req, res, next = (f) => f) => {
  //if nothing is passed next is a default function.
  if (authorized) {
    next();
  } else {
    throw new Error("Unauthorized");
  }
};
