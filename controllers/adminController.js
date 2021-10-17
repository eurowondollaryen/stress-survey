const admin = require("../models/admin.js");

//post : req.body, get(url) : req.query
const searchAdmin01 = async (req, res) => {
  const {} = req.query;
  try {
    const result = await admin.searchAdmin01([]);
    console.log("[adminController][searchAdmin01] request success!");
    var responseObj = result;
    //console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

exports.searchAdmin01 = searchAdmin01;