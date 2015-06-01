


var el;


angular.module('IDA', ['ui.bootstrap'])

.controller('master', function master($scope){



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
		1:{text:'Jenny attends the out of state program', answer:'b', response:{
			a:'This option might affect the student’s studies completion but it is not the most serious drawback. Try again',
			b:'Yes, the cost of attending an out of state program would be a serious drawback for the student',
			c:'Jenny may require extra time to attend an out of state program but it is not the most serious drawback. Try again',
		}},
		2:{text:'Jenny attends the local sculpture exhibition', answer:'c', response:{
			a:'This option may delay Jenny submitting her assessment but it isn’t a serious setback in terms of her studies. Try again',
			b:'This option may incur a cost, but as it is only the cost of entry this is unlikely to be a serious drawback for the student. Try again',
			c:'Yes, whilst this option has far fewer drawbacks for the student, but it may still mean that she requires more time to complete her assessment'
		}},
		3:{text:'Jenny waits to attend the local program later in the year', answer:'a', response:{
			a:'Yes, waiting to attend a local program later in the year may represent a significant drawback by delaying the completion of Jenny’s studies',
			b:'This option may incur a cost, but as it is only the cost of entry this unlikely to be a serious drawback for the student. Try again',
			c:'This option will create greater drawbacks than delaying Jenny’s submission of the assessment. Try again'
		}}
	}

	m.answers = {
		'a':'There is a timeliness issue associated with this option. Jenny may not be able to complete her course within the semester and could need to carry over an incomplete grade. This could have further impacts on her next semesters study.',
		'b':'Cost of attending the exhibition and timeliness will be an issue.',
		'c':'Jenny will require extra time to attend the exhibition in her own time and may require an assignment extension to complete.'
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
			if(el && $(el).parent()[0] !== e.currentTarget && (z.children().length === 0 || z.hasClass('ida_answerHolder')) ){
				z.append(el);
			}
			else if(z.children().length > 0){
				var a = z.find('.ida_answer');
				var b = $(el);
				var bp = b.parent();
				a.appendTo(bp);
				b.appendTo(z);
				//setTimeout(function(){
					//$(bp).trigger('change')
				//}, 1000);


			}



			m.safeApply();
		});

		setInterval(function(){
			scope.answer = false;
			var t = element.clone();
				t.find('.ignore').remove();
			for (var i in m.answers) {
				if (m.answers[i] === t.text().trim()) {
					scope.answer = i;
				}
			}
			m.safeApply();

		},10)

	};
})

.directive('drag', function() {
	return function(scope, element, attrs) {

		element.bind('selectstart', function(e) {
			e.preventDefault();
			m.safeApply();
			return false;
		});

		element.bind('dragstart', function(e) {
			console.log(1)
			el = e.currentTarget;
			m.safeApply();
		});

		element.bind('drag', function(e) {
			console.log(2)
		});

		element.bind('dragend', function(e) {
			console.log(3)
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
