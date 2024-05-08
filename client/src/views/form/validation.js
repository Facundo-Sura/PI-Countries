const validate = (input) => {
  const errors = {};

  //VALIDACIONES DE NAME

  if (input.name.trim() == "") {
    errors.name = "(Este campo no debe estar vacio)";
  }

  if (input.name.split(" ").length > 4) {
    errors.name = "(Este campo no puede tener mas de 4 espacios en blanco)";
  }

  for (let i = 0; i < input.name.length; i++) {
    if (!isNaN(parseInt(input.name[i]))) {
      errors.name = "(El nombre no debe contener un numero)";
    }
  }

  if (input.name.length > 20) {
    errors.name = "(Debe ser menor a 20 caracteres)";
  }

  //VALIDACIONES DE DIFICULTAD

  const dificultyNumber = parseInt(input.dificulty);

  if (isNaN(dificultyNumber) || dificultyNumber < 1 || dificultyNumber > 5) {
    errors.dificulty = "(La dificultad debe ser un numero del 1 al 5)";
  }

  if (input.dificulty.trim() === "") {
    errors.dificulty = "(Este campo no debe estar vacio)";
  } else if (input.dificulty.trim().length > 1) {
    errors.dificulty = "(La dificultad debe tener 1 dígito)";
  }

  //VALIDACIONES DE DURACION

  const durationNumber = parseInt(input.duration);

  if (isNaN(durationNumber) || durationNumber < 1 || durationNumber > 9) {
    errors.duration = "(La duracion debe ser un numero del 1 al 9 horas)";
  }

  if (input.duration.trim() === "") {
    errors.duration = "(Este campo no debe estar vacio)";
  }

  if (input.duration.trim().length > 1) {
    errors.duration = "(La duracion debe tener un maximo de 1 dígito)";
  }

  if (input.season === "") {
    errors.season = "(Se debe seleccionar la temporada)";
  }

  if (input.countries.length === 0) {
    errors.countries = "(No hay paises seleccionados)";
  }

  return errors;
};

export default validate;
