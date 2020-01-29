$(document).ready(function() { 
    var topics = ["Star Wars", "Post Malone", "Super Smash Bros", "Programming", "Video Games", "Volkswagen", "Cats", "Supra"];
    
    function loadTopics() {
        let btnDump = $("#btnContainer");
        btnDump.empty();
        for(i = 0; i < topics.length; i++) {
            let newBtn = $("<button>");
            newBtn.text(topics[i]);
            newBtn.attr("class", "btn btn-primary search-btn");
            newBtn.attr("data-name", topics[i]);
            btnDump.append(newBtn);
        }
        $(".search-btn").on("click", function() {
            searchGif($(this).attr("data-name"));
        });
    }

    loadTopics();

    function searchGif(query) {
        console.log("query: " + query);
        let queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=6PrWbgJXv569vpUHuyWBmkZEP16KTk7T&q=" + query + "&limit=10&offset=0&lang=en"
        $.ajax({
            url: queryUrl,
            method: "GET", 
        }).then(function(response) {
            console.log(response);  
            let gifs = response.data;
            
            $(".gif-dump").empty();
            for(i = 0; i < gifs.length; i++) {
                let container = $("<div>");
                container.attr("class","img-container");
                let rating = $("<p>");
                rating.text("Rating: " + gifs[i].rating);
                let img = $("<img>");
                img.attr("src", gifs[i].images.original.url);
                container.append(rating, img);
                $(".gif-dump").append(container);
            }
        });
    }

    function addTopic() {
        let topic = $("#query").val();
        for(i = 0; i < topics.length; i++) {
            if(topics.includes(topic, i)) {
                alert("Value already added!");
                return false;
            }
        }
        if(topic != "") {
            topics.push(topic);
            loadTopics();
        }
    }
    
    $(".search-btn").on("click", function() {
        searchGif($(this).attr("data-name"));
    });
    $("#add-btn").on("click", addTopic);
});