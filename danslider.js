// slider script, by Daniel Ochoa

var Slider = {

  // variable
  slideState : 0,

  // public functions _all are private in the end..
  run : function() {
    Slider.naturalStates();
    Slider.clickNext();
    Slider.clickPrevious();
    Slider.clickSquare();
  },

  clickNext : function() {
    $('.nav-right').click(function() {
      Slider.slideLeftFull();
    });
  },

  clickPrevious : function() {
    $('.nav-left').click(function() {
      Slider.slideRightFull();
    });
  },

  clickSquare : function() {
    $('.slider-block').click(function() {
      // get diff between currently selected and active
      var selected = $(this).index() + 1; // currently selected
      var current = Slider.slideState + 1; // currently active
      var difference;

      if (selected == current) {
        // do nothing..
      } else if (selected > current) {
        difference = selected - current;
        for (var i = 0; i < difference; i++) {
          Slider.slideLeftFull();
        }
      } else if (selected < current) {
        difference = current - selected;
        for (var j = 0; j < difference; j++) {
          Slider.slideRightFull();
        }
      }
    });
  },

  // private methods (not really private)
  block : $('.slider-block'),

  naturalStates : function() {
    $('.nav-left').fadeTo(0, 0.33);
    //$('.android-img').children().fadeTo(0, 0);
    //$('.android-img').children().eq(3).fadeTo(0, 1);
  },

  sliderState : function() {
    if (Slider.slideState === 0) {
      $('.nav-left').fadeTo(0, 1);
    } else if (Slider.slideState == 3) {
      $('.nav-right').fadeTo(0, 1);
    }
  },

  slideLeft : function() {
    $('.slider-full').animate({ marginLeft : '-=542px' }, 200);
  },

  slideRight : function() {
    $('.slider-full').animate({ marginLeft : '+=542px' }, 200);
  },

  slideLeftFull : function() {
    Slider.sliderState();
    if (Slider.slideState < 3) {
      // tie to our android images..
      Slider.androidControl('left');
      // end
      Slider.slideLeft();
      Slider.slideState ++;
      // remove active state of the squares and then activate corresponding
      Slider.block.removeClass('active').eq(Slider.slideState).addClass('active');
      if (Slider.slideState === 3) {
        $('.nav-right').fadeTo(0, 0.33);
      }
    }
  },

  slideRightFull : function() {
    if (Slider.slideState > 0) {
      // tie to our android images..
      Slider.androidControl('right');
      Slider.sliderState();
      Slider.slideRight();
      Slider.slideState --;
      Slider.block.removeClass('active').eq(Slider.slideState).addClass('active');
      if (Slider.slideState === 0) {
        $('.nav-left').fadeTo(0, 0.33);
      }
    }
  },

  // control of the android screen
  androidControl : function(direction) {
    // have to invert state
    var inverted;
    inverted = 3 - Slider.slideState;
    if (direction === 'left') {
      $('.android-img').children().eq(inverted).fadeTo(100, 0);
    } else if (direction === 'right') {
      inverted = inverted + 1;
      $('.android-img').children().eq(inverted).fadeTo(100, 1);
    }
  }
};
