$(document).ready(function () {

      const video = $("#youtTubeVideo")
      let recipeTitle = $("#recipeTitle")
      let recipeTitlePopup = $("#recipeTitlePopup")
      let ingredientsList = $("#ingredientsList")
      const saveButton = $("#saveButton")
      const clearButton = $("#clearButton")
      const recipesButton = $("#recipesButton")
      let youtubeVideo = $("#youtubeVideo")

      var api_key = "1583ebbcc0b71b443409e71ce9aeb0c0"
      var app_id = "c830e7a5"

      $("input").on("keydown", function (event) {
            if (event.keyCode == 13) {
                  event.preventDefault()
                  const searchTerm = $("#search").val()
                  var searchURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + app_id + "&app_key=" + api_key
                  console.log(searchURL)
                  $.ajax({
                        url: searchURL,
                        method: "GET"
                  }).then(function (response) {
                        console.log(response)
                        recipeTitle.text(response.hits[0].recipe.label)
                        recipeTitlePopup.text(response.hits[0].recipe.label)
                        for (i = 0; i < response.hits[0].recipe.ingredients.length; i++) {
                              newIngredient = $("<li>")
                              newIngredient.text(response.hits[0].recipe.ingredients[i].text)
                              ingredientsList.append(newIngredient)
                        }
                  })
                  let youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + searchTerm + "&key=AIzaSyCpinsFzK8YgE-y0pDgj1f7ZuGlsVdjrkI"
                  $.ajax({
                        url: youtubeURL,
                        method: "GET"
                  }).then(function (youtube) {
                        console.log(youtube)
                        let youtubeVidID = youtube.items[0].id.videoId
                        youtubeVideo.attr("src", "https://www.youtube.com/embed/" + youtubeVidID)
                  })
            }
      })

      saveButton.on("click", function () {
            var elem = document.getElementById("#modal1")
            var instance = M.Modal.getInstance(elem);
            instance.open()
      })
})




// //Edamam API
//       //c830e7a5 edamam application ID 
//             //1583ebbcc0b71b443409e71ce9aeb0c0 edamam application key used to authenticate requests 

//             //example 
//             const settings = {
//                   "async": true,
//                   "crossDomain": true,
//                   "url": "https://edamam-recipe-search.p.rapidapi.com/search?q=chicken",
//                   "method": "GET",
//                   "headers": {
//                         "x-rapidapi-key": "bf44b73a88msh48ab9ef42ebfc0fp1dc138jsnca698990928b",
//                         "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com"
//                   }
//             };ni

//             $.ajax(settings).done(function (response) {
//                   console.log(response);
//             });


// Youtube API
//AIzaSyCpinsFzK8YgE-y0pDgj1f7ZuGlsVdjrkI key
// 'https://youtube.googleapis.com/youtube/v3/search?maxResults=25&q=surfing&key=[YOUR_API_KEY]' \
//   --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
//   --header 'Accept: application/json' \
//   --compressed