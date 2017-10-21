/**
 * User: semihonay
 * Date: 28.08.2017
 */
let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

/* GET login page. */
router.get('/', (req, res) => {
  /*let mail = req.query.mail;
  let passwd = req.query.passwd;
  let mkodu = req.query.mkodu;

// Create token
  let token = {
    token: jwt.sign(
        {email: mail, mkodu: mkodu},
        passwd),
  };*/
  //res.json(token);

  // Verify token
  let decoded = jwt.verify(req.query.token, 'CgySm27', (err, decoded) => {
    res.json({ decoded: decoded, err: err });
  });
});

module.exports = router;