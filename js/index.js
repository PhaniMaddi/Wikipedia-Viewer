// functions
function searchWiki() {
  var userInput = $('#query').val();
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?",
    data: {
      "action": "query",
      "format": "json",
      "generator": "search",
      "gsrlimit": 10,
      "prop": "info|pageimages|extracts",
      "exintro": 1,
      "explaintext": 1,
      "exsentences": 1,
      "exlimit": "max",
      "pilimit": "max",
      "inprop": "url",
      "redirects": 1,
      "gsrsearch": userInput
    },
    dataType: 'jsonp',
    type: 'POST',
    async: false,
    headers: {
      'Api-User-Agent': 'Example/1.0'
    },
    success: function(data) {
      var pages = data.query.pages;
      displayPages(pages);
    },
    error: function(err) {
      alert(err);
    }
  });
}

function displayPages(pages) {
  var result = "";
  $.each(pages, function(index, value) {
    var url = value.canonicalurl;
    var title = value.title;
    var extract = value.extract;
    if (!value.thumbnail) {
      var image = " ";
    } else {
      var thumb = value.thumbnail.source;
      var image = "<img src='" + thumb + "' alt='Page image for " + title + "' class='thumbnail'>";
    }
    result += "<li class='list-group-item'>";
    result += image;
    result += "<a href='" + url + "' target='_blank'>" + title + "</a>";
    result += "<p class='extract'>" + extract + "</p>";
    result += "</li>";

  });
  $("#results").html(result);
}

// runtime
$(document).ready(function() {
  $("#ping").on("submit", function(e) {
    e.preventDefault();
    searchWiki();
  });
});