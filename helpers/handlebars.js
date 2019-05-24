function hbsHelpers(hbs) {
  return hbs.create({
    defaultLayout: "main",
    extname: ".hbs",

    helpers: {
      foo: function () {
        var nest = {
          one: {
            bar: "is the lonliest!"
          },
          two: "is just as bad as one"
        };
        return nest.one.bar;
      },
      trim: function (data) {
        var arr = [];
        var section;

        data.forEach(function (item) {
          // console.log(item.dataValues);
          section = item.dataValues;

          arr.push(section);
        });
        // console.log(data);
        console.log(arr);

        return arr;
      }


      // More helpers...
    }

  });
}

module.exports = hbsHelpers;


