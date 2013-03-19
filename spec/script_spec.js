(function() {

  require([], function() {
    describe("the shit", function() {
      console.log("hejsan");
      it("true should be true", function() {
        var asdf;
        asdf = true;
        expect(true).toEqual(asdf);
      });
    });
  });

}).call(this);
