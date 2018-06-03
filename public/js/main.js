$(document).ready(function(){
  $('.delete-note').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/notes/'+id,
      success: function(response){
        alert('Are you sure you want to delete this note?')
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});