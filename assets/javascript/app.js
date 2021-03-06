var giphy = {
  // Initial car brand buttons created at the top of webpage
  topics: ["Ford", "Chevy", "Jeep", "Toyota", "Honda", "Acura", "Lexus"],
  createButton: function(buttonText) {
    var buttonToAdd = $(
      "<button class='btn btn-secondary m-2 buttonAdded' type='button'>"
    );
    // Set text to button
    buttonToAdd.text(buttonText);

    // Add event listener for click
    buttonToAdd.click(function() {
      // Git rid of previous giphys
      $(".col1").html("");
      $(".col2").html("");
      $(".col3").html("");

      console.log(buttonText.replace(" ", "+"));
      var carBrand = buttonText.replace(" ", "+");

      // API call made based on car brand inserted onto button created by user
      $.ajax({
        url:
          "https://api.giphy.com/v1/gifs/search?q=" +
          carBrand +
          "+cars&rating=pg-13&api_key=77FM2f89axLfnl24JApF0AGYhgwwpeBy&limit=10",
        method: "GET"
      }).then(function(response) {
        console.log(response);

        var gifID = 0;
        var numOfGiphysOnCol = 1;

        // forEach function on data array of response received to loop thru items of interest (giphy and rating)
        response.data.forEach(function(element) {
          // Create div element column to contain giphy and rating
          var giphyCol = $("<div class='d-flex flex-column m-0'>");
          // Create img elment to contain initially paused giphy
          var giphy = $("<img>");
          // Create label element to contain rating of giphy
          var rating = $("<label>");

          console.log(element.images.original_still.url);
          console.log(element.images.original.url);
          console.log(element.rating);

          // Create giphy and corresponding attributes
          giphy.attr(
            "src",
            element.images.original_still.url.replace("https", "http")
          );
          giphy.attr(
            "data-still",
            element.images.original_still.url.replace("https", "http")
          );
          giphy.attr(
            "data-animate",
            element.images.original.url.replace("https", "http")
          );
          giphy.attr("data-state", "still");
          giphy.attr("class", "giphy embed-responsive rounded");

          // Give label associated rating
          rating.text("Rating: " + element.rating);

          // Append created giphy to div column created giphyCol
          giphyCol.append(giphy);
          giphyCol.append(rating);

          // Append giphyCol to correct div (col1, col2, col3)
          if (numOfGiphysOnCol < 4) {
            $(".col1").append(giphyCol);
          } else if (numOfGiphysOnCol >= 4 && numOfGiphysOnCol < 7) {
            $(".col2").append(giphyCol);
          } else if (numOfGiphysOnCol >= 7 && numOfGiphysOnCol < 11) {
            $(".col3").append(giphyCol);
          }
          console.log(numOfGiphysOnCol);
          numOfGiphysOnCol++;
        });
        $(".giphy").on("click", function() {
          console.log(this);
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });
    });

    return $(".buttonsHere").append(buttonToAdd);
  }
};

$(document).ready(function() {
  // Create intial buttons on the top part of webpage (.buttonsHere div)
  giphy.topics.forEach(function(element) {
    giphy.createButton(element);
    console.log(element);
  });

  // Submit button which creates another button in header section
  $("#submit").click(function(event) {
    event.preventDefault();

    // Store value of text submitted by user
    var newButtonText = $("#search-input")
      .val()
      .trim();
    console.log(newButtonText);

    // Clear text field
    $("#search-input").val("");

    // Checks to see if user has inserted value into text field before creating new button 
    if (newButtonText !== "") {
      // Create new button up top
      giphy.createButton(newButtonText);
    } else if (newButtonText == ""){
        alert("Please insert car brand into search field before clicking 'select' or pressing enter.");
    }
  });
});
