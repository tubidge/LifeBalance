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
      },
      list: function (context, options) {

        data.forEach(function (item) {
          obj = {
            id: item.dataValues.id,
            category: item.dataValues.category,
            active: item.dataValues.active,
          };

          return '<option value="{{category}}" data-active="{{active}}" data-category="{{id}}">{{ category }}</option>'

          // console.log(obj);
          // return obj;
          // arr.push(obj);
        });
        // console.log(arr);

        // return arr;
      }


      // More helpers...
    }

  });
}

module.exports = hbsHelpers;


