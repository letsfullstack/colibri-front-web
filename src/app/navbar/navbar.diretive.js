import './navbar.diretive.scss'

export const NavbarDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./navbar.diretive.html"),
      scope: {},
      controller: ["$state", "$scope", "$element", NavbarController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "navbarDiretive"
}

function NavbarController($state, $scope, $element) {
  var vm = this

  $scope.$watch(function () { return $state.$current.name }, function (newVal) {
    if (newVal === '/') $(window).scroll(function () {
      if ($(this).scrollTop() > 200)
        $element.addClass('invert')
      else
        $element.removeClass('invert')
    }) 
    else if(newVal !== '/'  && newVal !== ''){
      $element.addClass('invert')
      $("main").css("margin-top", "90px")
    }
  })
}