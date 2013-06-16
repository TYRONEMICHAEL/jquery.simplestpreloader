;(function ($, window, document, undefined) {

	var pluginName = "simplestImagePreloader",
		simplestImagePreloader = (function() {
			function onNotify(promiseMaster, numComplete, total) {
				promiseMaster.notify({
					complete: numComplete,
					percentage: parseInt(numComplete / total * 100, 10)
				});
			}

			function onComplete(promiseMaster, promiseArray) {
				$.when.apply(null, promiseArray).then(function () {
					promiseMaster.resolve();
				}, function () {
					promiseMaster.reject(promiseArray);
				});
			}

			return {
				preload: function(images) {
					var promiseMaster = new $.Deferred(),
						promiseArray = [],
						numComplete = 0;

					$(images).each(function () {
						var promise = new $.Deferred(),
							$imagePlaceholder = $("<img/>");

						promiseArray.push(promise);

						$imagePlaceholder.attr("src", this).load(function () {
							numComplete += 1;
							onNotify(promiseMaster, numComplete, images.length);
							promise.resolve();
						});

						$imagePlaceholder.error(function () {
							promise.reject();
						});
					});

					onComplete(promiseMaster, promiseArray);

					return promiseMaster.promise();
				}
			};
		})();

	$.fn[pluginName] = function () {
		return simplestImagePreloader.preload(this);
	};
})(jQuery, window, document);