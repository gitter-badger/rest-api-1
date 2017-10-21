/**
 * User: semihonay
 * Date: 28.08.2017
 */
const API_KEY = 'ff42d464b378457c979899caab8a1e69';
let express = require('express');
let router = express.Router();
let fetch = require('node-fetch');
//let URL = `https://newsapi.org/v1/articles?source=the-next-web&language=tr&sortBy=latest&apiKey=${API_KEY}`;
let URL = 'https://newsapi.org/v1/sources';

/* GET news page. */
router.get('/', (req, res) => {
  /*let mail = req.param('mail');
  let passwd = req.param('passwd');
  let mkodu = req.param('mkodu');*/
  fetch(
    URL,
    {
      method: 'GET',
      compress: true,
    },
  ).then(res => res.json()).then((json) => {
    res.send(json);
  });
});

module.exports = router;