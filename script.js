$(document).ready(function () {
      renderSearchHistory()
      var savedRecipes = JSON.parse(localStorage.getItem("recipes")) || []
      $('#modal1').modal();
      //$("#modalClose").close()

      function searchRecipes(searchTerm) {

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


            var searchURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + app_id + "&app_key=" + api_key
            console.log(searchURL)
            $.ajax({
                  url: searchURL,
                  method: "GET"
            }).then(function (response) {
                  console.log(response)
                  if (response.count == 0) {
                        alert("No recipes match the search terms entered.  Edit your search.")
                  } else {
                        recipeTitle.text(response.hits[0].recipe.label)
                        recipeTitlePopup.text(response.hits[0].recipe.label)
                        $("#recipeLink").attr("href", response.hits[0].recipe.url)
                        $("#recipeLink").text("Checkout Recipe Here")
                        $("recipeLink").attr("class", "waves-effect waves-light btn-small red lighten-2")
                        for (i = 0; i < response.hits[0].recipe.ingredients.length; i++) {
                              newIngredient = $("<li>")
                              newIngredient.text(response.hits[0].recipe.ingredients[i].text)
                              ingredientsList.append(newIngredient)
                        }
                        let recipeName = recipeTitlePopup.text()
                        let youtubeURL = "https://cors-anywhere.herokuapp.com/https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + recipeName + "&key=AIzaSyCpinsFzK8YgE-y0pDgj1f7ZuGlsVdjrkI"
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
      }

      $("input").on("keydown", function (event) {

            let searchTerm = $("#search").val()
            if (event.keyCode == 13) {
                  $("li").remove()
                  event.preventDefault()
                  searchRecipes(searchTerm)

            }


      })




      function renderSearchHistory() {
            const recipeEl = $("#recipeCards").html("")
            var retrievedRecipes = localStorage.getItem("recipes")
            var checkDupRecipes = JSON.parse(retrievedRecipes)
            let uniqueRecipes = [...new Set(checkDupRecipes)]
            console.log(uniqueRecipes)
            var dataValue = 0
            for (let i = 0; i < uniqueRecipes.length; i++) {
                  dataValue++
                  const recipeCard = $("<div>")
                  recipeCard.attr("class", "row")
                  recipeCard.attr("class", "recipeCard")
                  recipeCard.attr("data-value", dataValue)
                  const card = $("<div>")
                  card.attr("class", "card")
                  const col = $("<div>")
                  col.attr("class", "col s12 m6")
                  const cardImage = $("<div>")
                  cardImage.attr("class", "card-image")
                  const recipeTitle = $("<p>")
                  recipeTitle.attr("class", "recipeTitle")
                  recipeTitle.attr("data-attribute", uniqueRecipes[i])
                  recipeTitle.text(uniqueRecipes[i])

                  const cardContent = $("<div>")
                  cardContent.attr("class", "card-content")
                  const delBtn = $("<a>")
                  delBtn.attr("class", "btn-floating halfway-fab waves-effect waves-light red removeButton")

                  const trashIcn = $("<i>")
                  trashIcn.attr("class", "far fa-trash-alt")

                  cardContent.append(recipeTitle)
                  delBtn.append(trashIcn)
                  cardImage.append(delBtn)
                  card.append(cardImage)
                  card.append(cardContent)
                  col.append(card)
                  recipeCard.append(col)
                  recipeEl.append(recipeCard)
            }
      }

      $("p.recipeTitle").on("click", function (event) {
            event.preventDefault()
            let searchTerm = $(this).attr("data-attribute")
            searchRecipes(searchTerm)
      })


      $("#saveButton1").on("click", function (event) {
            event.preventDefault()
            var recipeNameSave = $("#recipeTitle").text()
            savedRecipes.push(recipeNameSave)
            console.log(savedRecipes)
            localStorage.setItem("recipes", JSON.stringify(savedRecipes))
            renderSearchHistory()
      })

      $(".removeButton").on("click", function (event) {
            event.preventDefault()
            console.log(this)
            $(this).parent().parent().parent().parent(".recipeCard").empty()
            var getLocalStorage = JSON.parse(localStorage.getItem("recipes"))
            var newArr = getLocalStorage
            console.log(newArr)
            var cousinValue = $(this).parent().parent().parent().parent(".recipeCard").empty()
            console.log(cousinValue)
            localStorage.setItem("recipes", JSON.stringify(newArr))
      })
      /*
            $("#clearButton").on("click", function () {
                  checkDupCities = []
                  uniqueCities = []
                  recentCities = []
                  localStorage.clear()
                  $("input").remove("#recentCity")
                  window.location.reload()
            })
      */





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