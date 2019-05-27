function hbsHelpers(hbs) {
  return hbs.create({
    defaultLayout: "main",
    extname: ".hbs",

    helpers: {
      foo: function () {
        var nest = {
          one: {
            is: "the lonliest number"
          },
          two: "is just as bad as one"
        };
        return nest.one.bar;
      },

      header: function (data) {
        var splice, str;
        for (var i = 0; i < data.length; i++) {

          splice = data.splice(0, 1);
          str = `<h5 class="category-title" data-category=${splice[0].dataValues.id}>${splice[0].dataValues.category}</h5>`
          // console.log(splice);
          // console.log(str);

          return str;
        }

      }
    }
  });
}

module.exports = hbsHelpers;


