$(document).on('ready', function(){

getEmployees();
// var Person = function(name, id, salary, score){
// this.name = name;
// this.id = id;
// this.salary = salary;
// this.score = score;
// }
// var atticus = new Person('Atticus', '2405', '47000', 3);
// var jem = new Person('Jem', '62347', '63500', 4);
// var boo = new Person('Boo', '11435', '54000', 3);
// var scout = new Person('Scout', '6243', '74750', 5);
var employees = [];

function getBonus(employee) {
    var bonusPercent = 0;
    var newArray = [];
    var bonusObject = {};
    bonusObject['name'] = employee.name;
    newArray[0] = employee.name;

    switch (employee.score) {
        case 0:
        case 1:
        case 2:
            break;
        case 3:
            bonusPercent = 4;
            break;
        case 4:
            bonusPercent = 6;
            break;
        case 5:
            bonusPercent = 10;
            break;
        default:
            alert("Invalid rating for employee " + employee[0]);
    }
    if (employee.id.length === 4) {
        bonusPercent += 5;
    }
    if (employee.salary > 65000) {
        bonusPercent--;
    }
    if (bonusPercent > 13) {
        bonusPercent = 13;
    }
    if (bonusPercent < 0) {
        bonusPercent = 0;
    }
    bonusObject['bonus_percent'] = bonusPercent;
    bonusObject['adjusted_income'] = (Math.round(employee.salary * ((bonusPercent / 100) + 1) * 100)) / 100;
    bonusObject['bonus_total'] = Math.round(employee.salary * (bonusPercent / 100));

    newArray[1] = bonusPercent;
    newArray[2] = (Math.round(employee.salary * ((bonusPercent / 100) + 1) * 100)) / 100;
    newArray[3] = Math.round(employee.salary * (bonusPercent / 100));
    return bonusObject;
}

var outputObject = [];
var bonusDataArray = [];


function getEmployees(){
  $.ajax({
    type: 'GET',
    url: '/employee',
    success: function (data){
      console.log(data);
      employees = data;
      for (var i = 0; i < employees.length; i++) {
          outputObject = getBonus(employees[i]);
          bonusDataArray[i] = getBonus(employees[i]);
          $('#table').append( "<tr> <td> " + outputObject.name + "</td> <td> "+ outputObject.bonus_percent + "</td> <td> " + outputObject.adjusted_income + "</td><td> " + outputObject.bonus_total + "</td> </tr>");

      }
      console.log('this', bonusDataArray);
      postBonusData(bonusDataArray);

    }

  })

}

function postBonusData(bonusData){
  $.ajax({
    type: 'POST',
    url: '/employee',
    data: bonusData,
    success: function(data){
      console.log('seems like you did something');
    }
  })

}




})
