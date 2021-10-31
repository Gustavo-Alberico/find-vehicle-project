// Insert "-" on plate
function plateTransform(plate) {
  return plate.substring(0, 3) + '-' + plate.substring(3).trim();
}

// fetch to verify if plate is registered
async function plateVerify(plate) {
  let plateDate = [];
  plate = plateTransform(plate);
  return await fetch(`/getplate/${plate}`, {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default',
  })
    .then(async (response) => {
      plateDate = await response.json();
      if (plateDate.length === 0) {
        return false;
      } else {
        plateDate.forEach((e) => {
          if (plate === e.plate) {
            insertError(`Placa "${plate}" já cadastrada.`);
            document.getElementById('plate').value = '';
            return true;
          }
        });
      }
    })
    .catch((error) => console.log(error));
}

// Show error pop-up
function insertError(message) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: 'error',
    title: message,
  });
}

// Validate form
function validateForm() {
  let regexPlate = new RegExp('^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$');
  let model = document.getElementById('model').value;
  let plate = document.getElementById('plate').value;
  let year = document.getElementById('year').value;
  parseInt(document.querySelector('input[name="status"]:checked').value); //input radio value

  model = model.replace(/\s{2,}/g, ' ').trim();

  // Validate model field
  if (model === '' || model == null) {
    insertError('Modelo inválido');
    return false;
  }

  // Validate plate
  if (!regexPlate.test(plate)) {
    insertError(
      `Placa ${plate} inválida, a place deve seguir os padrões "AAA0000" ou "AAA0A00"`
    );
    return false;
  }

  // Validate year
  if (isNaN(year)) {
    insertError(`Ano deve ser numérico, valor: "${year}" inválido`);
    return false;
  } else if (year < 1900) {
    insertError(`Valor "${year}" é inválido`);
    return false;
  } else if (year > new Date().getFullYear()) {
    insertError(`Valor declarado: "${year}" é maior do que ano atual`);
    return false;
  }

  return true;
}
