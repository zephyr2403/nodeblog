$("document").ready(function(){
$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade');
  });

$('.opensidebar').click(function(evt){
       $('.ui.sidebar.vertical').sidebar('setting','transition','slide out').sidebar('toggle')
});

$('.ui.dropdown').dropdown();

$('.dropdown')
  .dropdown({
    action: 'hide',
    onChange: function(value, text, $selectedItem) {
      var category = text.toLowerCase().trim();
      if(category==='all')
      {
      console.log(category)
        $('.cardcontainer').each(function(){
          $(this).removeClass("animate fadeOut")
          $(this).removeClass("animated fadeIn")
          $(this).addClass("animated fadeIn")
          $(this).css('display','block');
        })
      }//if statement
      else{
        $('.cardcontainer').each(function(){
          var scat=$(this).find('.card .ribbon').text().toLowerCase().trim()
          if(scat==category){
            $(this).removeClass("animate fadeOut hiddenz")
            $(this).addClass("animated fadeIn display")
            $(this).css('display','block');
          }else {
            $(this).removeClass("animated fadeIn")
            $(this).css('display','none')
            $(this).addClass("animate fadeOut")

          }

        })//function
      }//else
    }//onchange
  });//.dropdown

});//document ready
