function postPermissionFactory(AdminPermission) {
  return AdminPermission;
}

postPermissionFactory.$inject = ['AdminPermission'];

function postDetailControllerFactory(
  ModelDetailController,
  $injector,
  $state,
  $sce,
  PostPermission
) {
  function PostDetailController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PostPermission()
      }
    });

    self.load($scope.post).then(function(post) {
      if (post.id) {
        self.view(post);
      } else {
        self.edit(post);
      }
    });
  }

  PostDetailController.$inject = ['$scope'];
  PostDetailController.prototype = Object.create(ModelDetailController.prototype);

  PostDetailController.prototype.view = function(item) {
    // Deleted a post or cancelled a new one
    if (this.scope.item === null) {
      $state.go('posts');
    } else {
      ModelDetailController.prototype.view.call(this, item);
    }
  };

  PostDetailController.prototype.save = function() {
    var self = this;

    var isNew = !self.scope.item.id;

    return ModelDetailController.prototype.save.call(self).then(function(post) {
      // New post
      if (isNew) {
        // Redirect to the new post's URL
        $state.go('post', {postId: post.id});
      }
    });
  };

  return PostDetailController;
}

postDetailControllerFactory.$inject = [
  'ModelDetailController',
  '$injector',
  '$state',
  '$sce',
  'PostPermission'
];

export {
  postPermissionFactory,
  postDetailControllerFactory
};
