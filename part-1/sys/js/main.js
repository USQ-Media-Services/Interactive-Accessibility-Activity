

var el;


angular.module('IDA', ['ui.bootstrap'])

.controller('master',  function ($scope, $log) {



	m = $scope;

	m.safeApply = function(fn) {
		var phase = this.$root.$$phase;
		if(phase === '$apply' || phase === '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		}
		else {
			this.$apply(fn);
		}
	};






  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
  	console.log(1)
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
  	console.log(2)
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };


	m.check = function(i, t){
		var a = $($('.ida_answerSlots').get(i)).clone();
		a.find('.ignore').remove();
		a = a.find('*')
		if(a.length === 0) return 1;
		if((a.text() ===  t)) return 2;
		if((a.text() !==  t)) return 3;
		return ;
	}

	m.sheets = [];

	m.getStylesheet = function(mode){
		if(mode && mode.sheet)return 'sys/css/' + mode.sheet + '.css';
		return '';
	}

	m.displayModes = [
		{'title':'Standard', 'sheet':''},
		{'title':'Dyslexic', 'sheet':'dyslexic'},
		{'title':'Vision impairment', 'sheet':'lowVision'}
		//{'title':'Colour vision deficiency', 'sheet':'colourBlind'}
	]

	m.questions = {
		1:{text:'Deaf or hard of hearing', answer:'c'},
		2:{text:'Social anxiety', answer:'d'},
		3:{text:'Blindness or impairment of vision', answer:'b'},
		4:{text:'Wheelchair access', answer:'a'}
	}

	m.answers = {
		'a':'Only use venues that have wheelchair access and/or lifts',
		'b':'Provide large text or alternative format for written materials',
		'c':'Have a sign language interpreter available and/or provide captioning',
		'd':'All social activities at the event are optional. Invite participants to bring a friend, relative or other guest'
	}



})


.directive('drop', function() {
	return function(scope, element, attrs) {


		element.bind('dragover', function(e) {
			e.preventDefault();
			m.safeApply();
			return false;
		});

		element.bind('drop', function(e) {
			e.preventDefault();
			var z = $(e.currentTarget);
			if(el && $(el).parent()[0] != e.currentTarget && (z.children().length == 0 || z.hasClass('ida_answerHolder')) ){
				z.append(el);
			}
			else if(z.children().length > 0){
				var a = z.find('.ida_answer');
				var b = $(el);
				var bp = b.parent();
				a.appendTo(bp);
				b.appendTo(z)


			}
			m.safeApply();
		});


	};
})

.directive('drag', function() {
	return function(scope, element, attrs) {

		element.bind('dragstart', function(e) {
			el = e.currentTarget;
			m.safeApply();
		});

		element.bind('dragend', function(e) {
			el = false;
			m.safeApply();
		});

	};
})

.directive('ngHoverIn', function() {
	return function(scope, element, attrs) {
		element.bind('pointerover', function() {
			try{
			console.log(3)
				scope.$apply(attrs.ngHoverOver);
			}catch(e){}
		});
	};
})

.directive('ngHoverOut', function() {
	return function(scope, element, attrs) {
		element.bind('pointerout', function() {
			try{
				scope.$apply(attrs.ngHoverOut);
			}catch(e){}
		});
	};
})

.directive('ngPointer', function() {
	return function(scope, element, attrs) {
		element.off('click').bind('pointerdown', function() {
			try{
				scope.$apply(attrs.ngPointer);
			}catch(e){}
		});
	};
});









