handleSearch = () => {
  let searchResult = [];
  var word = document.getElementById('search-input').value;
  document.querySelector('.search-results').innerHTML = `<p>Fetching Data.</p>`

  axios.get(`http://localhost:3080/search/${word}`, {
    params: {
      id: word
    }
  })
  .then((response) => {
    searchResult = response.data;
  })
  .catch((error) => {
    console.log(error.response)
  })
  .finally(() => {
    console.log(searchResult)
    if(searchResult.length == 0){
      alert('Database returned no results');
      location.reload();
    }else {
      $('.search-results').html(searchResult.map((item, index) => {
        return `
        <div id='result-title' title="${item.meta.id}">
          <p>${item.meta.id}</p>
        </div>
        `
      }).join('')
      )
  
      $('.word-results').html("<p>No word selected</p>")
    }
    
  })
}

gettingRelatedVideos = (title) => {
  let youtubeResult = [];

  $('.youtube-results').html('<p>Getting related youtube videos. Please wait.</p>')

  const videoOptions = {
    method: 'GET',
    url: 'https://youtube-search-results.p.rapidapi.com/youtube-search/',
    params: {q: title},
    headers: {
      'X-RapidAPI-Key': '20c235102fmshd6270b130bfde80p117f78jsnfcc2a6803488',
      'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
    }
  }


  axios.request(videoOptions)
  .then(function (response) {
    console.log(response.data.items)
    youtubeResult = response.data.items;
  })
  .catch(function (error) {
    console.error(error);
  })
  .finally(() => {
    $('.youtube-results').html(
      youtubeResult.map((video) => {
        let thumbnail_url = video.bestThumbnail.url;
        return `
          <div class='related-video'>
            <img src='${thumbnail_url}' />
            <a onclick='openVideo(this.id)' id='${video.id}'>
              <h3>${video.title}</h3>
            </a>
            <span>Views: ${video.views}</span>
          </div>
        `
      }).join("")
    )
  })
}

$(document).on('click', '#result-title', function() {
  let wordResult = [];

  var title = $(this).attr('title');
  $('.word-results').html(`<p>Getting definition of the word ${title}</p>`)


  axios.get(`http://localhost:3080/word/${title}`, {
    params: {
      id: title
    }
  })
  .then((response) => {
    console.log(response.data[0])
    wordResult = response.data;
  })
  .finally(() => {
    for(let i = 0; i < 1; i++){
      $('.word-results').html(
        ` 
          <h1>${wordResult[i].meta.id}</h1>
          <p id='definition'>${wordResult[i].shortdef}</p>
          <span onclick="readDefinition()">Read Definition</span>
        `
      )   
    }
  })

  gettingRelatedVideos(title);

})

openVideo = (video_id) => {
  // alert(video_id)
  yt_iframe = $('#target-iframe');
  
  yt_iframe.attr('src', `https://www.youtube.com/embed/${video_id}?autoplay=1&mute=0`);
  $('.custom-modal').css({'display':'flex'});
}