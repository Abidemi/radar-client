function firstPromise($q) {
  return function firstPromise(promises) {
    if (promises.length) {
      var promise = promises[0];

      return $q.all(promises).then(function() {
        return promise;
      });
    } else {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    }
  };
}

firstPromise.$inject = ['$q'];

export default firstPromise;
