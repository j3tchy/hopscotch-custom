import Ember from 'ember';

export default Ember.Controller.extend({
	// hopscotch: Ember.inject.service(),

	init: function(){

		var tour = {
			id: "hello-hopscotch",
			bubbleWidth: "250",
			showPrevButton: true,
			steps: [
				{
					title: "My header",
					content:"This is the header of my page.",
					target: "title",
					placement: "bottom",
					onNext: function(){
						Ember.$('#title').removeClass('overlay-relative');
						Ember.$('.helper').remove();
					}
				},{
					title: "Text",
					content:"Lorem lipsum text for the paragraph.",
					target: "text",
					placement: "bottom",
					onNext: function(){
						Ember.$('#text').removeClass('overlay-relative');
						Ember.$('.helper').remove();
					}
				},{
					title: "Image",
					content:"Sample text for example", 
					target: "image",
					placement: "right",
					onNext: function(){
						Ember.$('#image').removeClass('overlay-relative');
						Ember.$('.helper').remove();
					}			
				}
			],
			onStart: ["addOverlay"],
			onClose: ["removeOverlay"],
			onEnd: ["removeOverlay"],
			i18n: {
				nextBtn: "nextBtn",
				prevBtn: "prevBtn",
				doneBtn: "doneBtn",
				skipBtn: "skipBtn",
				closeTooltip: "CLOSE",
				stepNums: ["one","two"]
			}
		};

		hopscotch.registerHelper('addOverlay', function(){
			Ember.$('body').append('<div class="overlay"></div>');
		});

		hopscotch.registerHelper('removeOverlay', function(){
			Ember.$('.helper').fadeOut(); 
			Ember.$('.overlay').fadeOut(function(){
				Ember.$(this).remove();
			});
		});

		hopscotch.listen('show', function(){
			var element = Ember.$(hopscotch.getCurrTarget(tour));
			
			var helper;
			var newHelper;

			var padding;
			var helperPosX;
			var helperPosY;

			var targetWidth;
			var targetHeight;

			element.prev().removeClass('overlay-relative');
			element.addClass('overlay-relative');	

			if(Ember.$('.helper').length !== 0){

				helper = Ember.$('.helper');
				padding = 5;

				helperPosX = element.position().left - padding;
				helperPosY = element.position().top - padding;

				Ember.$(window).resize(function(){
					helperPosX = element.position().left - padding;
					helperPosY = element.position().top - padding;

					helper.offset({ 
						left: helperPosX,
						top: helperPosY
					});
				});

				targetWidth = element.outerWidth(true);
				targetHeight = element.outerHeight(true);

				helper.css('width', targetWidth);
				helper.css('height', targetHeight);

				helper.offset({ 
					left: helperPosX,
					top: helperPosY
				});	

			} else {

				newHelper = '<div class="helper"></div>';
				Ember.$('body').append(newHelper);

				helper = Ember.$('.helper');
				padding = 5;

				helperPosX = element.position().left - padding;
				helperPosY = element.position().top - padding;

				Ember.$(window).resize(function(){
					helperPosX = element.position().left - padding;
					helperPosY = element.position().top - padding;

					helper.offset({ 
						left: helperPosX,
						top: helperPosY
					});
				});

				targetWidth = element.outerWidth(true);
				targetHeight = element.outerHeight(true);

				helper.css('width', targetWidth);
				helper.css('height', targetHeight);

				helper.offset({ 
					left: helperPosX,
					top: helperPosY
				});				
			}

		});

		hopscotch.startTour(tour);
	}
});
