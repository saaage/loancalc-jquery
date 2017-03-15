var $ = require('jquery');

$(function(){
  /* on page load run following script*/

    let $submitButton = $('.app-input__form--submit');
    /*use $ method to select submit button by class name - we will use this to create an event listener on $submitButton*/

    /*select $termMonthsField and $termYearsField*/
    let $termMonthsField = $('[data-js="months"]');
    let $termYearsField = $('[data-js="years"]');

    function checkValueYears(){
    /*check if $termYearsField has a value. If it does have a value, disable $termMonthsField. If it is cleared, enable $termMonthsField*/
      if ($termYearsField.value.length == 0) {
        $termMonthsField.disabled = false;
        return false;
      } else if ($termYearsField.value != null) {
        $termMonthsField.disabled = true;
        return true;
      }
    }

    $termYearsField.on("change", function(){

      checkValueYears();

    });

    function checkValueMonths(){
    /*check if $termMonthsFieldhas a value. If it does have a value, disable $termYearsField. If it is cleared, enable $termYearsField.*/
      if ($termMonthsField.value.length == 0) {
        $termYearsField.disabled = false;
        return false;
      } else if ($termMonthsField != null) {
        $termYearsField.disabled = true;
        return true;
      }
    }

    $termMonthsField.on("change", function() {

      checkValueMonths();

    });

    $submitButton.on("click", function(e){
    /*add an event listener to $submitButton*/

      e.preventDefault();
      /*keep page from reloading*/

      /*Next, we will pull form values. Need either term in years or term in months to run calculations*/
      /*create instance variables*/
      let principal = loanForm.elements[name="amount"].value;
      let years = loanForm.elements[name="years"].value;
      let months = loanForm.elements[name="months"].value;
      let nonConvertedRate = loanForm.elements[name="rate"].value;
      let startDate = loanForm.elements[name="date"].value;
      let rate = nonConvertedRate/12/100;
      let fuckNumber = 0;

      /*Use checkValueYears/checkValueMonths to assign a value to fuckNumber*/
      if (checkValueYears()) {
        fuckNumber = Math.pow((1+rate), years*12);
      }else if (checkValueMonths()) {
        fuckNumber = Math.pow((1+rate), months);
      }

      /*payment is calculated*/
      let payment = (principal*((rate*fuckNumber)/(fuckNumber-1))).toFixed(2);

      /*create an h2 element*/
      var $paymentHeaderElement = $('<h2>');
      /*create a text node to hold payment */
      $paymentHeaderElement.text(payment);

      /*append $paymentHeaderElement to application output div*/
      var outputSection = $('.app__output');
      outputSection.append($paymentHeaderElement);

    });
})
