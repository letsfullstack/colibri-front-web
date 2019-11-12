import './navbar.diretive.scss'

export const NavbarDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./navbar.diretive.html"),
      scope: { },
      controller: ["$state", "$scope", "$element", NavbarController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "navbarDiretive"
}

function NavbarController($state, $scope, $element) {
  var vm = this

  $(window).scroll(function() {
    if ($(this).scrollTop() > 200)
      $element.removeClass('invert')
    else
      $element.addClass('invert')
  })

  $scope.$watch(function(){ return $state.$current.name }, function(newVal, oldVal){
    if(newVal === '/')
      $element.addClass('invert')
    else
      $element.removeClass('invert')
  }) 
}