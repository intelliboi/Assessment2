function checkForm() {
  // ids of the various input elements I want info from
  var key = [
    "firstname",
    "lastname",
    "email",
    "phone",
    "day",
    "month",
    "year",
    "password",
    "confirm"
  ];

  var userData = [];

  // pulls info from input elements and puts it in an array
  for (var i = 0; i < 9; i++) {
    userData[i] = document.getElementById(key[i]).value;
  }

  // call various checking functions
  // checkName has a second field so it can be reused for lastname
  checkName(userData[0], key[0]);
  checkName(userData[1], key[1]);
  checkEmail(userData[2]);
  checkMobile(userData[3]);
  checkBirthday(userData[4], userData[5], userData[6]);
  checkPassword(userData[7], userData[8]);
}

function checkName(name, element) {
  if (name === "") {
    // name is blank
    document.querySelector(".name p.error").innerHTML =
    "Please enter your name";
    bad(element);

  } else if (/^[a-zA-Z \'\-]*$/g.test(name) === false) {
    // RegEx tests that name is composed entirely of letters,
    // spaces, apostrophes, and hyphens. Informs user of this too.
    document.querySelector(".name p.error").innerHTML =
    "Your name can only contain letters, spaces, apostrophes, and hyphens";
    bad(element);

  } else if (/^[A-Za-z]+/g.test(name) === false) {
    // tests that the name begins with a letter
    document.querySelector(".name p.error").innerHTML =
    "Your name must begin with a letter";
    bad(element);

  } else {
    // name is good
    document.querySelector(".name p.error").innerHTML = "";
    good(element);

  }
}

function checkEmail(email, element) {
  if (email === "") {
    // email is blank
    document.querySelector(".email p.error").innerHTML =
    "Please enter your email address";
    bad(email);

    // RegEx testing that email is of the form '___@___.___'
  } else if (/\S+@\S+\.\S+/g.test(email) === false) {

    document.querySelector(".email p.error").innerHTML =
    "Your email address is invalid, please try again";
    bad(email);

  } else {

    document.querySelector(".email p.error").innerHTML = "";
    good("email");

  }
}

function checkMobile(phone, element) {
  if (phone === "") {
    // phone number is blank
    document.querySelector(".phone p.error").innerHTML =
    "Please enter your mobile phone number";
    bad("phone");

  } else if (intCheck(phone) === false) {
    // phone number is not entirely composed of digits
    document.querySelector(".phone p.error").innerHTML =
    "Your mobile phone number must consist only of digits - no spaces either";
    bad("phone");

  } else if (phone.length !== 10) {
    // mobile numbers are 10 digits long
    document.querySelector(".phone p.error").innerHTML =
    "Your mobile phone number should be 10 digits long";
    bad("phone");

  } else {
    // if passes all previous tests, good number
    document.querySelector(".phone p.error").innerHTML = "";
    good("phone");
  }
}

function checkBirthday(day, month, year) {
	
  //Fix malicious strings
  day = injectionProtection(day)
  month = injectionProtection(month)
  yeahr = injectionProtection(year)
	
  if (day === "" || month === "" || year === "") {
    // if day, month, or year are left blank
    document.querySelector(".birthday p.error").innerHTML =
    "Please enter your date of birth";
    // lack of specificity for the sake of brevity
    bad("day");
    bad("month");
    bad("year");

  } else if (!(intCheck(day) && intCheck(month) && intCheck(year))) {
    // if day, month, or year aren't integers
    document.querySelector(".birthday p.error").innerHTML =
    "Please enter a valid date of birth";
    bad("day");
    bad("month");
    bad("year");

  } else {

    // Data will now be manipulated as numbers from here on
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    if (year < 1918 || year > 2018) {
      // surely there aren't any centenarians using this website
      // hardcoding current year, if you're seeing this then I forgot
      document.querySelector(".birthday p.error").innerHTML =
      "Please enter a valid year";
      bad("year");

    } else {
      // year is an integer between 1918 and 2018 - all good
      document.querySelector(".birthday p.error").innerHTML = "";
      good("year");

      if (month < 1 || month > 12) {
        // last I checked there were only 12 months
        document.querySelector(".birthday p.error").innerHTML =
        "Please enter a valid month";
        bad("month");

      } else {
        // month is an integer between 1 and 12 inclusive - all good
        document.querySelector(".birthday p.error").innerHTML =
        "";
        good("month");
        print
        // begin february nonsense
        if (month === 2) {
          // leap years are divisible by 4
          if (year % 4 === 0) {
            // during a leap year, Feb has 29 days
            if (day < 0 || day > 29) {

              document.querySelector(".birthday p.error").innerHTML =
              "Please enter a valid day";
              bad("day");

            } else {

              good("day");

            }
          } else {
            // during a non-leap year, Feb has 28 days
            if (day < 0 || day > 28) {

              document.querySelector(".birthday p.error").innerHTML =
              "Please enter a valid day";
              bad("day");

            } else {

              good("day");

            }
          }
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
          // April, June, September, and November only have 30 days
          if (day < 0 || day > 30) {

            document.querySelector(".birthday p.error").innerHTML =
            "Please enter a valid day";
            bad("day");

          } else {

            good("day");

          }
        } else {
          // all the rest have 31
          if (day < 0 || day > 31) {

            document.querySelector(".birthday p.error").innerHTML =
            "Please enter a valid day";
            bad("day");

          } else {

            good("day");

          }
        }
      }
    }
  }
}

function intCheck(intText) {
  // RegEx checking that WHOLE string is composed ONLY of digits
  return /^[0-9]*$/g.test(intText);
}

function checkPassword(password1, password2) {
  //Fix malicious strings
  password1 = injectionProtection(password1)
  password2 = injectionProtection(password2)
  
  // if password is blank
  if (password1 === "") {
    document.querySelector(".password p.error").innerHTML =
    "Please enter a password";
    bad("password");
    bad("confirm");

  } else if (password1 !== password2) {
    // if passwords don't match
    document.querySelector(".password p.error").innerHTML =
    "Passwords don't match";
    bad("confirm");

  } else {
    // passwords match and aren't blank
    document.querySelector(".password p.error").innerHTML =
    "";
    good("password");
    good("confirm");
  }
}

function good(element) {
  // sets the border of the input element to green for 'good'
  document.getElementById(element).style.border = "1px solid green";
}

function bad(element) {
  // sets the border of the input element to red for 'bad'
  document.getElementById(element).style.border = "1px solid red";
}

function injectionProtection(the_string){
  return the_string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
