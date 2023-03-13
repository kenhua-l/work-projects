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

function projectOpen($thiselem, title, imgPath) {
  let project = dataJson.find(function(elem) {
    return elem.title === title;
  })
  // change title
  $thiselem.find('.modal-title').html(project.title);
  // change status
  $thiselem.find('.modal-status').html('Status: ' + project.status);
  // change link
  if(project.link) {
    $thiselem.find('.modal-link').html('Link: <a href="' + project.link + '" target="_blank">' + project.link + '</a>');
  } else {
    $thiselem.find('.modal-link').html('');
  }

  // add description in info
  if(project.details && Array.isArray(project.details)) {
    let modalInfo = $thiselem.find('.modal-info').empty();
    let modalRow = $('<div class="row"></div>');
    let modal6img = $('<div class="col-6"></div>');
    modal6img.append('<img class="project-img" src="' + imgPath + project.image + '.png" alt="' + project.title + '" />');
    modalRow.append(modal6img);
    let modal6info = $('<div class="col-6"></div>');
    modal6info.append('<div class="project-detail">' + project.details.join('') + '</div>');
    modalRow.append(modal6info);
    modalInfo.append(modalRow);
  } else if(project.details) {
    $thiselem.find('.modal-info').empty();
    $thiselem.find('.modal-info').append('<div class="project-detail">' + project.details + '</div>');
    $thiselem.find('.modal-info').append('<img class="project-img" src="' + imgPath + project.image + '.png" alt="' + project.title + '" />');
  } else {
    $thiselem.find('.modal-info').empty();
    $thiselem.find('.modal-info').append('<img class="project-img" src="' + imgPath + project.image + '.png" alt="' + project.title + '" />');
  }
  // $thiselem.find('.project-img').attr('src', imgPath + project.image + '.png');


}

$(function() {
  // everything on document ready
  $('.project-list-container').ListProjects({
    data: '/data/projects.json',
    imgPath: '/img/'
  });

  // open the project modal
  $('#project').on('show.bs.modal', function(e) {
    let project = $(e.relatedTarget).data('project');
    projectOpen($(this), project, '/img/');
  });

  $('.project-modal > .btn-prev').on('click', function() {
    
  });
  $('.project-modal > .btn-next').on('click', function() {

  });

});