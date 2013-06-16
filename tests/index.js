describe("SimplestImagePreloader", function () {
	var images = ["http://placekitten.com/200/300", "http://placekitten.com/1500/1500", "http://placekitten.com/200/300"],
		imagesWithfailedImage = ["http://placekitten.com/200/300", "http://resource.does.not.exist.co.za", "http://placekitten.com/200/300"],
		successfulPreload = $(images).simplestImagePreloader(),
		failedPreload = $(imagesWithfailedImage).simplestImagePreloader();

	it("has dependencies loaded", function () {
		expect($).toBeDefined();
		expect($.fn.jquery).toBeDefined();
	});

	it("exists as a jQuery plugin", function () {
		expect($.fn.simplestImagePreloader).toBeDefined();
	});

	it("preloads images", function () {
		var complete = false;

		successfulPreload.done(function () {
			complete = true;
		});

		waitsFor(function () {
			return complete;
		});
	});

	it("completes with failed image", function () {
		var complete = false;

		failedPreload.always(function () {
			complete = true;
		});

		waitsFor(function () {
			return complete;
		});
	});

	it("fails elegantly", function () {
		var complete = false,
			promises;

		failedPreload.fail(function (returnedPromises) {
			promises = returnedPromises;
			complete = true;
		});

		waitsFor(function () {
			return complete;
		});

		runs(function() {
			expect(promises[1].state()).toEqual("rejected");
			expect(imagesWithfailedImage[1]).toEqual("http://resource.does.not.exist.co.za");
		});
	});

	it("shows progress", function () {
		var numComplete = 0,
			percentage = 0,
			complete = false;
		successfulPreload.progress(function (progress) {
			numComplete = progress.complete;
			percentage = progress.percentage;
		});
		successfulPreload.done(function () {
			complete = true;
		});
		waitsFor(function () {
			return complete;
		});
		runs(function () {
			expect(numComplete).toEqual(3);
			expect(percentage).toEqual(100);
		});
	});
});