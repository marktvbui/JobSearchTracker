$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyApDITNB6iKlUbMqEXcQmNb2Dy49W_4gvk",
    authDomain: "job-tracker-82da4.firebaseapp.com",
    databaseURL: "https://job-tracker-82da4.firebaseio.com",
    projectId: "job-tracker-82da4",
    storageBucket: "job-tracker-82da4.appspot.com",
    messagingSenderId: "702834347026"
  };
  firebase.initializeApp(config);

  // setting varibles
  var database = firebase.database();
  var date = '';
  var company ='';
  var title = '';
  var phoneScreen ='';
  var interviewDate ='';
  var offer ='';
  // function to display the calendar
  $(function() {
    $('#datepicker, #datepicker1, #datepicker2').datepicker();
  });

  // on click function, retrieving data from input fields
  $('#submit-Info').on('click', function(event) {
    // prevents page from refreshing when submit is clicked
    event.preventDefault();
    //setting weight and date variables to what was inputed
    date = $('#datepicker').val().trim();
    company = $('.companyName').val().trim();
    title = $('.jobTitle').val().trim();
    email = $('.emailSent').val().trim();
    phoneScreen = $('.phoneScreen').val().trim();
    inteviewDate = $('.interview-date').val().trim();
    offer = $('.offerMade').val().trim();

    // making sure required fields are entered
    if ((date === '') || (company === '') || (title === '') ) {
      alertModal('date-input');
      return false;
    }

    // setting object (firebase only accepts objects)
    jobApplication = {
      date: date,
      company: company,
      title: title,
      email: email,
      phoneScreen: phoneScreen,
      inteviewDate: interviewDate,
      offer: offer
    }
    // pushing the jobApplication object into the database
    database.ref('jobApplied').push(jobApplication);
    // clears the input values after submit
    $('#datepicker').val('');
    $('.companyName').val('');
    $('.jobTitle').val('');
    $('.emailSent').val('')
    $('.phoneScreen').val('');
    $('.interview-date').val('');
    $('.offerMade').val('');


  })

  function DisplayJobStatus() {
    // accessing the database, each time a new element is added, function will automatically run
    database.ref('jobApplied').on('child_added', function(snapshot) {
      // sets jobApplied variable to current child added to firebase
      var jobStatus = snapshot.val();
      // setting up table tr, td elements
      var row = $('<tr>');
      row.append($('<td>').html(jobStatus.date));
      row.append($('<td>').html(jobStatus.company));
      row.append($('<td>').html(jobStatus.title));
      row.append($('<td>').html(jobStatus.email));
      row.append($('<td>').html(jobStatus.phoneScreen));
      row.append($('<td>').html(jobStatus.inteviewDate));
      row.append($('<td>').html(jobStatus.offer));
      row.append($('<td><a href="#">&times;</a></td>'));
      // appending row items to the table
      $('#job-table').append(row);
    }, function(errorObject) {
      console.log('read failed: ' + errorObject);
    })
  }

  function alertModal(input) {
    // setting modal to hidden status
    $('[data-modal-option]').hide();
    // passes through the input to correctly pick the right modal
    $('.modal-' + input).show();
    // shows the correct modal
    $('#myModal').show();
    // sets the x button to close the modal, and closes the modal
    $('#myModal .close').on('click', function() {
      $('#myModal').hide();
    })
  };

  // this function currently removes the element from the page, working on removing from the database
  $(function(){
    $('table').on('click','tr a',function(e){
       e.preventDefault();
       var test = database.ref('weightStatus');
       console.log(test);
      $(this).parents('tr').remove();
    });
  });
  // calling function to always display weight lost table
  DisplayJobStatus();
});