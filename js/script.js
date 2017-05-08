// http://api.jquery.com/jquery.getjson/#jsonp
window.onload = function() {

  var container = [];
  var footer = [];
  $('#visor').html(0);
  $('#foot').html(0);

  $("#ac").click(function(){
    container=[];
    footer=[];
    $('#visor').html(0);
    $('#foot').html(0);
  })

  $("#ce").click(function(){
    $('#visor').html(0);
    container.splice(-1);
    if(container.length==0){
      $('#foot').html(0);
      return;
    }
    $('#foot').html(container);
  })

  $("#1,#2,#3,#4,#5,#6,#7,#8,#9,#0,#dot").click(function(){
    var visorValue = $('#visor').html();
    var buttonValue = $(this).attr("value");
    if(visorValue=="-" || visorValue=="/" || visorValue=="+" || visorValue=="x" || visorValue=="=" || (visorValue=="0" && buttonValue !=".") ){ $('#visor').empty(); }
    if($('#foot').html()=="0" && buttonValue !="."){$('#foot').empty()};
    $('#visor').append(buttonValue);
    $('#foot').append(buttonValue);
  })

  $("#minus,#plus,#multiply,#division").click(function(){
    if($('#visor').html()!=0){
      var visorElem = $('#visor').html();
      var elem = parseFloat(visorElem);
      $('#visor').empty();
      var operation = $(this).attr("value");
      $('#visor').html(operation);
      container.push(elem,operation);
      $('#foot').append(operation);
    }else{
      $('#visor').empty();
      var operation = $(this).attr("value");
      $('#visor').html(operation);
      container.push(operation);
      $('#foot').append(operation);
    }
    console.log(container);
  })
  $('#foot').append(container);

  $("#equals").click(function(){
    var visorElem = $('#visor').html();
    var elem = parseFloat(visorElem);
    container.push(elem);
    $('#foot').html(container);
    console.log(container);

    while (container.length>2) {
      for(var i = 0; i<container.length;i++){
        switch (container[i]) {
          case "-": var minus = container[i-1]-container[i+1]; container.splice(i-1,i+2,minus);break;
          case "+": var soma = container[i-1]+container[i+1]; container.splice(i-1,i+2,soma);break;
          case "/": var divison = container[i-1]/container[i+1]; container.splice(i-1,i+2,divison);break;
          case "x": var multiply = container[i-1]*container[i+1]; container.splice(i-1,i+2,multiply);break;
          default: $('#visor').html('Error');break;
        }
      }
    }
    if (container[0]%1 !=0) {
      var result = container[0].toFixed(2);
      $('#foot').html(result);
      $('#visor').html(result);
      container=[];
      return;
    }
    $('#foot').html(container[0]);
    $('#visor').html(container[0]);
    container=[];
  })
};
