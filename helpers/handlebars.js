function hbsHelpers(hbs) {
  return hbs.create({
    helpers: { // This was missing
      get: function (obj, prop) {
        console.log(obj[prop]);
        return obj[prop];
      }

      // More helpers...
    }

  });
}

module.exports = hbsHelpers;