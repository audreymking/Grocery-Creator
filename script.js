$(document).ready(function () {
      renderSearchHistory()
      var savedRecipes = JSON.parse(localStorage.getItem("recipes")) || []
      $('#modal1').modal();


      function searchRecipes(searchTerm) {
            let recipeTitle = $("#recipeTitle")
            let recipeTitlePopup = $("#recipeTitlePopup")
            let youtubeVideo = $("#youtubeVideo")
            var api_key = "1583ebbcc0b71b443409e71ce9aeb0c0"
            var app_id = "c830e7a5"
            let ingredientsList = $("#ingredientsList")
            if (recipeTitle == null || recipeTitle == "" || recipeTitle == "Null" || recipeTitle == "null") {
                  alert("No recipes match the search terms entered.  Edit your search.")
            } else {
                  var searchURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + app_id + "&app_key=" + api_key
                  $.ajax({
                        url: searchURL,
                        method: "GET"
                  }).then(function (response) {
                        if (response.count == 0) {
                              alert("No recipes match the search terms entered.  Edit your search.")
                        } else {
                              recipeTitle.text(response.hits[0].recipe.label)
                              recipeTitlePopup.text(response.hits[0].recipe.label)
                              $("#recipeLink").attr("href", response.hits[0].recipe.url)
                              $("#recipeLink").text("Checkout Recipe Here")
                              $("recipeLink").attr("class", "waves-effect waves-light btn-small red lighten-2")
                              $("li").remove()
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
                                    let youtubeVidID = youtube.items[0].id.videoId
                                    youtubeVideo.attr("src", "https://www.youtube.com/embed/" + youtubeVidID)
                              })
                        }
                  })

            }
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


      $("#saveButton1, #saveButton2").on("click", function (event) {
            event.preventDefault()
            var recipeNameSave = $("#recipeTitle").text()
            if (recipeNameSave == "" || recipeNameSave == "null" || recipeNameSave == "Null" || recipeNameSave == null) {
                  alert("nothing to save.  search for a recipe and then click save if you want that recipe.")
            } else {
                  savedRecipes.push(recipeNameSave)
                  localStorage.setItem("recipes", JSON.stringify(savedRecipes))
                  renderSearchHistory()
            }
      })

      $(".removeButton").on("click", function (event) {
            event.preventDefault()
            var cousinValue = $(this).closest("div").siblings().children().text()
            $(this).parent().parent().parent().parent(".recipeCard").empty()
            var getLocalStorage = JSON.parse(localStorage.getItem("recipes"))
            var newArr = getLocalStorage
            var filteredArray = newArr.filter((str) => {
                  return str.indexOf(cousinValue)
            })
            localStorage.setItem("recipes", JSON.stringify(filteredArray))
      })

      $("#clearAllButton").on("click", function (event) {
            event.preventDefault()
            var getLocalStorage = JSON.parse(localStorage.getItem("recipes"))
            getLocalStorage = []
            localStorage.setItem("recipes", JSON.stringify(getLocalStorage))
            renderSearchHistory()
            location.reload()
      })
})