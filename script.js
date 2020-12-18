$("document").ready(function () {
      const searchTerm = $("#search").val()
      const video = $("#youtTubeVideo")
      const recipeTitle = $("#recipeTitle")
      const ingredientsList = $("#ingredientsList")
      const saveButton = $("#saveButton")
      const clearButton = $("#clearButton")
      const recipesButton = $("#recipesButton")


      searchTerm.keypress(function (event) {
            if (event.which === 13) {
                  event.preventDefault()
                  const settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://edamam-recipe-search.p.rapidapi.com/search?q" + searchTerm,
                        "url": "https://api.edamam.com/search?q=chicken&app_key=$" + headers[0] + "&from=0&to=3"
                        "method": "GET",
                        "headers": {
                              "x-rapidapi-key": "bf44b73a88msh48ab9ef42ebfc0fp1dc138jsnca698990928b",
                              "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com"
                        }
                  };

                  $.ajax(settings).then(function (response) {
                        console.log(response);
                  });
            }
      });
})


// //Edamam API
//       //c830e7a5 edamam application key 
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
//             };

//             $.ajax(settings).done(function (response) {
//                   console.log(response);
//             });


// Youtube API
//AIzaSyCpinsFzK8YgE-y0pDgj1f7ZuGlsVdjrkI key