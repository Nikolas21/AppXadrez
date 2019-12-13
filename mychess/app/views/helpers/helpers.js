
const showError = function (errors, field) {
  
  var mensagem = "";
  if (typeof errors != 'undefined') {
  errors.forEach(function (error) {
    
  if (error.path == field) {
  mensagem = error.message;
 
  }
  });
 
  }
  return mensagem;
  }

const equals = function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
};

const hasError = function (errors){
  var mensagem = ""
if (errors)
  mensagem = "is-invalid";

  return mensagem
}


module.exports = { showError, equals, hasError };