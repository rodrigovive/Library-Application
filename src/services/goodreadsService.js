const debug = require('debug')('app:goodreadsService');
const axios = require('axios');
const xml2js = require('xml2js');

const parser = xml2js.Parser({
  explicitArray: false,
});

function goodreadServices() {
  function getBookById() {
    return new Promise((resolve, reject) => {
      axios.get('https://www.goodreads.com/book/show/656.xml?key=vprhEY5eSlPnX2VeEsMFMQ')
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }

  return {
    getBookById,
  };
}

module.exports = goodreadServices();
