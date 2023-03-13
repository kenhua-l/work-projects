// Structure the list item to append to $this
jQuery.fn.AppendProjectItem = function(item, imgPath) {
  let projectContainer = $('<div class="project-container"></div>');
  let projectItem = $('<div class="project" data-bs-toggle="modal" data-bs-target="#project" data-project="' + item.title + '"></div>');
  projectItem.append('<div class="project-img"><img src="' + imgPath + item.image + '.png" alt="' + item.title + '" /></div>');
  projectItem.append('<div class="project-info"><p class="project-title">' + item.title + '</p></div>');
  projectContainer.append(projectItem);
  $(this).append(projectContainer);
}

// init data listing
function listInit(datalist, $thiselem, imgPath) {
  $thiselem.empty();
  let projectList = $('<div class="project-list"></div>');
  for(let i in datalist) {
    projectList.AppendProjectItem(datalist[i], imgPath);
  }
  $thiselem.append(projectList);
}

var dataJson;
// Create a jquery function to populate project list
jQuery.fn.ListProjects = function(options) {
  let $thiselem = $(this);
  // Function Object Parameter
  let dataFile = options.data || '';
  let imgPath = options.imgPath || '/img/';
  $.ajax({
    type: 'GET',
    url: dataFile,
    dataType: 'json',
    success: function(datalist) {
      dataJson = datalist;
      listInit(datalist, $thiselem, imgPath);
    },
    error: function(error, text, thrown) {
      console.log(text);
    }
  })
}




function projectOpen(index) {

}

$(function() {
  // everything on document ready
  $('.project-list-container').ListProjects({
    data: '/data/projects.json',
    imgPath: '/img/'
  });

  $('.project-modal > .btn-prev').on('click', function() {
    
  });
  $('.project-modal > .btn-next').on('click', function() {

  });

});