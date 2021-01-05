$(document).ready(function () {
      //on page load we want to bring the search history from local storage to show the saved searches
      renderSearchHistory()
      //on page load we will either set saved recipes to the items in local storage, or an empty array if it is empty
      var savedRecipes = JSON.parse(localStorage.getItem("recipes")) || []
      //modal for when you click on view ingredients 
      $('#modal1').modal();

      //function to call edamam and youtube api based on search terms. 
      function searchRecipes(searchTerm) {
            let recipeTitle = $("#recipeTitle")
            let recipeTitlePopup = $("#recipeTitlePopup")
            let youtubeVideo = $("#youtubeVideo")
            var api_key = "1df2ae13cdae45953fcb01d364673c56"
            var app_id = "2cd7b86b"
            let ingredientsList = $("#ingredientsList")
            //prevents unsearchable terms.
            if (recipeTitle == null || recipeTitle == "" || recipeTitle == "Null" || recipeTitle == "null" || recipeTitle == 0) {
                  //provides a small message at the top for 4 seconds the search was invalid
                  M.toast({ html: "Invalid Search", classes: "rounded", displayLength: 4000 })
                  return
            } else {
                  var searchURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + app_id + "&app_key=" + api_key
                  $.ajax({
                        url: searchURL,
                        method: "GET"
                  }).then(function (response) {
                        if (response.count == 0) {
                              //message if no results are found from edamam api call response
                              M.toast({ html: "Invalid Search", classes: "rounded", displayLength: 4000 })
                              return
                        } else {
                              //making recipe cards at the bottom of the page so you can click on them later and see the recipes
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
                              //uses recipe search results in call to youtube api call. 
                              let recipeName = recipeTitlePopup.text()
                              let youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + recipeName + "&key=AIzaSyA_seyeGpnHzEPUZtpmwD1ZIuDGSGPeIDc"
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
      //when enter is pressed, search function is called
      $("#search").on("keydown", function (event) {

            let searchTerm = $("#search").val()
            if (event.keyCode == 13) {
                  $("li").remove()
                  event.preventDefault()
                  searchRecipes(searchTerm)
                  $(".enableOnInput").prop('disabled', false)
                  $("#viewIngredientsBtn").prop('disabled', false)
            }
      })

      //function to rendersearch history from local storage. 
      function renderSearchHistory() {
            const recipeEl = $("#recipeCards").html("")
            var retrievedRecipes = localStorage.getItem("recipes")
            var checkDupRecipes = JSON.parse(retrievedRecipes)
            //filters out duplicates from checkDupRecipes so there are no duplicate recipe cards
            let uniqueRecipes = [...new Set(checkDupRecipes)]
            var dataValue = 0
            //manipulae DOM to make recipe cards
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
                  cardContent.attr("class", "card-content savedRecipe")
                  const delBtn = $("<a>")
                  delBtn.attr("class", "btn-floating halfway-fab waves-effect waves-light red removeButton")
                  const trashIcn = $("<i>")
                  trashIcn.attr("class", "far fa-trash-alt")
                  trashIcn.attr("delete-attribute", uniqueRecipes[i])
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

      //event listener on each recipe card to call search function. 
      $("#recipeCards").on("click", function (event) {
            if (event.target.getAttribute("delete-attribute")) {
                  var cousinValue = event.target.getAttribute("delete-attribute")
                  console.log(cousinValue)
                  $(this).parent().parent().parent().parent().parent("#recipeCard").remove()
                  var getLocalStorage = JSON.parse(localStorage.getItem("recipes"))
                  var newArr = getLocalStorage
                  var filteredArray = newArr.filter((str) => {
                        return str.indexOf(cousinValue)
                  })
                  localStorage.setItem("recipes", JSON.stringify(filteredArray))
                  renderSearchHistory()
            } else {
                  event.preventDefault()
                  console.log(event.target)
                  let searchTerm = event.target.getAttribute("data-attribute")
                  searchRecipes(searchTerm)
                  $("#viewIngredientsBtn").prop('disabled', false)
            }

      })
      //event listener on each save button to save recipe name ot local storage.  
      $("#saveButton1, #saveButton2").on("click", function () {
            var recipeNameSave = $("#recipeTitle").text()
            if (recipeNameSave == "" || recipeNameSave == "null" || recipeNameSave == "Null" || recipeNameSave == null || recipeNameSave == 0) {
                  M.toast({ html: "Invalid Search", classes: "rounded", displayLength: 4000 })
                  return
            } else {
                  savedRecipes.push(recipeNameSave)
                  localStorage.setItem("recipes", JSON.stringify(savedRecipes))
                  renderSearchHistory()
            }
            $(".enableOnInput").prop('disabled', true)
      })
      //clear button event listener to empty local storage, and remove all recipe cards. 
      $("#clearAllButton").on("click", function (event) {
            event.preventDefault()
            var getLocalStorage = JSON.parse(localStorage.getItem("recipes"))
            getLocalStorage = []
            localStorage.setItem("recipes", JSON.stringify(getLocalStorage))
            renderSearchHistory()
            location.reload()
      })
})