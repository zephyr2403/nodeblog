$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade');
  });

$('.opensidebar').click(function(evt){
       $('.ui.sidebar.vertical').sidebar('setting','transition','slide out').sidebar('toggle')
});
