$(document).ready(function() {

  //funzione chiamata film
  $('.textarea').keyup(function(e) {

    if (e.which == 13) {

      var film = $('.textarea').val();

      // errore valore vuoto in textarea
      if ($('.textarea').val() == '') {
        $("#textarea-alert").fadeIn(1000);
        $("#textarea-alert").fadeOut(1500);
      }

      $.ajax({
        url: 'https://api.themoviedb.org/3/search/multi?',
        method: 'GET',
        data: {
          api_key: '28be332300429692bfeb9f356bd2b766',
          language: 'it-IT',
          query: film,
          page: 1
        },
        success: function(data) {
          ricercaFilm(data);
          console.log(data);
        },
        error: function(richiesta, stato, errore) {
          //
        }
      });
    }
  });

  $(document).on('mouseenter', '#risultati', function() {
    $(this).children('#copertina').hide();
    $(this).addClass('cover');
    $(this).children('#titolo, #titolo_originale, #voto, #lingua, #trama, #serie, #film').fadeIn();
  });

  $(document).on('mouseleave', '#risultati', function() {
    $(this).children('#copertina').fadeIn();
    $(this).removeClass('cover');
    $(this).children('#titolo, #titolo_originale, #voto, #lingua, #trama, #serie, #film').hide();
  });


  //funzione cerca film
  function ricercaFilm(data) {
    $('.tabella-risultati').html('');

    var array = data.results;

    //errore film inesistente
    if (array.length == 0) {
      $("#risultati-alert").fadeIn(1000);
      $("#risultati-alert").fadeOut(1000);
    }

    for (var i = array.length - 1; i >= 0; i--) {

      var risultati = $('#risultati').clone().prependTo('.tabella-risultati');

      var filmTrovati = data.results[i];

      //copertina
      if (filmTrovati.poster_path == null) {
        $('#copertina').html('<img src="unknown.png">');
      } else {
        $('#copertina').html('<img src="https://image.tmdb.org/t/p/w185/' + filmTrovati.poster_path + '">');
      }

      //titoli
      if (filmTrovati.name == undefined) {
        $('#serie').html('<b>- Film -</b>');
        $('#titolo').html('<b>Titolo: </b>' + filmTrovati.title);
        $('#titolo_originale').html('<b>Titolo Originale: </b>' + filmTrovati.original_title);
        if (filmTrovati.title == filmTrovati.original_title) {
          $('#titolo').html('<b>Titolo: </b>' + filmTrovati.title);
          $('#titolo_originale').html('');
        }
      } else {
        $('#serie').html('<b>- Serie TV -</b>');
        $('#titolo').html('<b>Titolo: </b>' + filmTrovati.name);
        $('#titolo_originale').html('');
      }

      //lingua
      if (filmTrovati.original_language == 'en') {
        $('#lingua').html('<b>Lingua originale:</b> <img src="en.png">');
      } else if (filmTrovati.original_language == 'fr') {
        $('#lingua').html('<b>Lingua originale:</b> <img src="fr.png">');
      } else if (filmTrovati.original_language == 'de') {
        $('#lingua').html('<b>Lingua originale:</b> <img src="ge.png">');
      } else if (filmTrovati.original_language == 'it') {
        $('#lingua').html('<b>Lingua originale:</b> <img src="it.png">');
      } else if (filmTrovati.original_language == 'ru') {
        $('#lingua').html('<b>Lingua originale:</b> <img src="ru.png">');
      } else if (filmTrovati.original_language == 'es') {
        $('#lingua').html('<b>Lingua originale:</b> <img src="sp.png">');
      } else if (filmTrovati.original_language == 'ja') {
        $('#lingua').html('<b>Lingua originale:</b> <img src="jp.png">');
      } else {
        $('#lingua').html('<b>Lingua originale:</b> ' + filmTrovati.original_language + ' <img src="no.png"><br>');
      }

      //voto
      if (filmTrovati.vote_average == 0) {
        $('#voto').html('<b>Voto:</b> Media voto inesistente')
      } else if (filmTrovati.vote_average <= 2.4) {
        $('#voto').html('<b>Voto:</b> <i class="fas fa-star"></i>')
      } else if ((filmTrovati.vote_average >= 2.5) && (filmTrovati.vote_average < 4.3)) {
        $('#voto').html('<b>Voto:</b> <i class="fas fa-star"></i><i class="fas fa-star"></i>')
      } else if ((filmTrovati.vote_average >= 4.4) && (filmTrovati.vote_average < 6.3)) {
        $('#voto').html('<b>Voto:</b> <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>')
      } else if ((filmTrovati.vote_average >= 6.4) && (filmTrovati.vote_average < 8.3)) {
        $('#voto').html('<b>Voto:</b> <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>')
      } else if ((filmTrovati.vote_average >= 8.4) && (filmTrovati.vote_average <= 10)) {
        $('#voto').html('<b>Voto:</b> <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>')
      }

      //trama
      if (filmTrovati.overview == '') {
        $('#trama').html('<b>Trama:</b> Non abbiamo una descrizione per questo titolo.')
      } else {
        $('#trama').html('<b>Trama:</b> ' + filmTrovati.overview)
      }


      $('#risultati').show();
    };

    $('.textarea').val('');
  };


  //
});
