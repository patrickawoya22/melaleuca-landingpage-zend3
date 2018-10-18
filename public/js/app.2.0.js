$(document).on('ready page:load', function () {
    $(document).foundation();
});
$(document).on('page:change', function () {
    $(document).foundation('equalizer', 'reflow');
});
$(document).on("click",".menu-icon-wrapper",function(e){
    e.preventDefault();
    e.stopPropagation();
    $("body").toggleClass("menu-setting");
});
$(document).on("click touchstart","#cookie-bar .button",function(e){
    $('#cookie-bar .cb-enable').trigger('click');
});
 $(function(){
 $('body').on( 'mousewheel DOMMouseScroll', function ( e ) {
   if( e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
     //scroll up
        if($(window).scrollTop() > 70)
        {
            $(".slideUp").removeClass("open");
        }
        //$("body").removeClass("menu-setting");

   } else {
     //scroll dowm
        $(".slideUp").addClass("open");
   }
   //prevent page fom scrolling
 });
});

 $(function(){

     $('.capitalize').keyup(function(event){
         var text = $(this).val().toLowerCase();
         $(this).val(text.capitalize('all'));
     });

     $('.capitalize_all').keyup(function(event){
         var text = $(this).val().toLowerCase();
         $(this).val(text.toUpperCase());
     });

     $('.clean_str').keyup(function(event){
         var text = $(this).val();
         $(this).val(text.replace(/\s/g, ''));
     });
     
	$('.dropdown-menu-why-us').click(function(e) { // stop dropdownMenu from disappearing until page loads
        $(".opens-right-why-us").toggleClass("is-active");
        $(".first-sub-why-us").toggleClass("js-dropdown-active");
	});

    $('.dropdown-menu-lead-generation').click(function(e) { // stop dropdownMenu from disappearing until page loads
        $(".opens-right-lead-generation").toggleClass("is-active");
        $(".first-sub-lead-generation").toggleClass("js-dropdown-active");
	});

    $('.dropdown-menu-price').click(function(e) { // stop dropdownMenu from disappearing until page loads
        $(".opens-right-price").toggleClass("is-active");
        $(".first-sub-price").toggleClass("js-dropdown-active");
	});
 });


 String.prototype.capitalize = function(type) {

 	// if type = all, capitalize first letter of each word
 	if(type === 'all'){
 		array		= this.split(' '); // split on spaces
 		capitalized	= '';

 		$.each(array, function( index, value ) {
 			capitalized += value.charAt(0).toUpperCase() + value.slice(1);

 			if( array.length != (index+1) )
 				capitalized += ' '; // add a space if not end of array
 		});
 		return capitalized;
 	}

 	// if type = title, capitalize first letter of each word so long as it is not
 	// an article, coordinate conjunction, preposition (etc) unless it is the first word
 	// -> traditionally left uppercase if over 4 or 5 letters
 	// -> I'm only doing the common ones, add more in the doNotCapitalize array
 	if(type === 'title'){
 		array		= this.split(' '); // split on spaces
 		capitalized	= '';
 		doNotCapitalize	= ["a", "an", "and", "as", "at", "but", "by", "etc", "for", "in", "into", "is", "nor", "of", "off", "on", "onto", "or", "so", "the", "to", "unto", "via"];

 		$.each(array, function( index, value ) {
 			// only capitalize if first word or not in doNotCapitalize array
 			if( index === 0 || $.inArray(value, doNotCapitalize) === -1 ) // inArray returns -1 for false, 0 for element index in array
 				capitalized += value.charAt(0).toUpperCase() + value.slice(1);
 			else
 				capitalized += value;

 			if( array.length != (index+1) )
 				capitalized += ' '; // add a space if not end of array
 		});
 		return capitalized;
 	}

 	// else just capitalize first letter of first word
 	return this.charAt(0).toUpperCase() + this.slice(1);
 };

 Array.prototype.clean = function(deleteValue) {
   for (var i = 0; i < this.length; i++) {
     if (this[i] == deleteValue) {
       this.splice(i, 1);
       i--;
     }
   }
   return this;
 };
