const Validate = (form) => {
    let errors = {};
    
    let regexLetters = /^[a-zA-Z ]+$/;
    let regexNumbers = /^[0-9]+$/;
    let regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    let regexLetSym =  /^[a-zA-Z,.;'" ]+$/;
    let regexLetSymNum = /^[A-Za-záéíóúÁÉÍÓÚñÑ0-9.,\s]+$/u;


    if(!form.name) errors.name = 'Name is required';
    else if(!(regexLetters).test(form.name)) errors.name = 'Name cannot symbols or numbers';

    if(!form.healthScore !== undefined && (form.healthScore < 1 || form.healthScore > 100)) errors.healthScore = 'Health Score is required between 1 and 100';
    else if(!(regexNumbers).test(form.healthScore)) errors.healthScore = 'Only accept numbers between 1 and 100';

    if(!form.summary) errors.summary = 'Summary is required';
    else if(!(regexLetSym).test(form.summary)) errors.summary = 'Only accepts letters, symbols and spaces';

    if(!form.steps) errors.steps = 'Steps is required';
    else if(!(regexLetSymNum).test(form.steps)) errors.steps = 'Only accepts letters, numbers, symbols and spaces';

    if(!form.image || !regexUrl.test(form.image)) errors.image = 'Image is required';

    if(!form.diets.length) errors.diets = 'Add a type of diet';

    return errors
  }

export default Validate;