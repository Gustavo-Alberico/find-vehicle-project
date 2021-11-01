// Set current date
const dateInputValue = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hour < 10) hour = '0' + hour;
  if (minutes < 10) minutes = '0' + minutes;

  const today = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes;
  return today;
};

// Set response of fetch function
let responseData = [];
let vehicleObj = {};
// Set startDate and endDate
let startDate = (document.getElementById('startDate').value = dateInputValue());
let endDate = (document.getElementById('endDate').value = dateInputValue());

// Set "min" attribute of dates
document.getElementById('startDate').setAttribute('min', dateInputValue());
document.getElementById('endDate').setAttribute('min', dateInputValue());

// Fetch on load
document.addEventListener('DOMContentLoaded', function () {
  callFetch(startDate, endDate);
});

// Get date changes
const elementsDate = document
  .querySelectorAll('.stateDate')
  .forEach((i, index) =>
    i.addEventListener('change', (e) => {
      const element = {
        index: index,
        elementValue: e.currentTarget.value,
      };
      if (element.index === 0) {
        startDate = element.elementValue;
      } else {
        endDate = element.elementValue;
      }
      // Call to fetch function
      callFetch(startDate, endDate);
    })
  );

// Fetch function to recover available vehicles
function callFetch(startDate, endDate) {
  fetch(`/getreserva/${startDate}:00/${endDate}:00`)
    .then(async (response) => {
      responseData = await response.json();
      clearSelect();
      // Call to set plate and year values of select date
      changeValues(0, responseData);
      responseData.forEach((e) => create(e));
    })
    .catch((error) => console.log(error));
}

// Clear old request of tag select
const clearSelect = () => {
  const clear = document.getElementById('sel');
  while (clear.firstChild) {
    clear.removeChild(clear.lastChild);
  }
};

// Create options in select tag
function create(e) {
  document
    .getElementById('sel')
    .options.add(new Option(`${e.model}`, `${e.id}`));
}

// Check the changes of select tag
const selectChange = document
  .getElementById('sel')
  .addEventListener('change', function () {
    let elementIndex = document.getElementById('sel').selectedIndex;
    // Call to set plate and year values
    changeValues(elementIndex, responseData);
  });

// Set plate and year values
function changeValues(i, data) {
  let plate = document.getElementById('plate');
  let year = document.getElementById('year');
  vehicleObj = data[i];

  plate.value = data[i].plate;
  year.value = data[i].year;
  plate.setAttribute('disabled', '');
  year.setAttribute('disabled', '');
}

// Validation and modal reservation confirm
let sendFormData = document
  .getElementById('send')
  .addEventListener('click', (e) => {
    const formData = {
      startDate: startDate,
      endDate: endDate,
      status: 1,
      vehicle: vehicleObj,
    };

    if (getDifferenceDate(new Date(startDate), new Date(endDate)) <= 0) {
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
        title:
          'Data "Fim da reserva" deve ser maior que data "Início da reserva"',
      });
      e.preventDefault();
      return false;
    }

    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Reserva provisória',
      html:
        // prettier-ignore
        '<div class="container-modal">'+
          '<div class="card-container">' +
            '<div class="card-body">' +
              '<div class="card-date">' +
                `<p>Início da reserva: ${formData.startDate.replaceAll('-', '/').replace('T', ' ')}</p>` +
                `<p>Fim da reserva: ${formData.endDate.replaceAll('-', '/').replace('T', ' ')}</p>`+
                '<p>Estado da reserva: <spam class="status">provisória</spam></p>' +
              '</div>' +
                '<h3>'+'Veículo'+'</h3>'+
              '<div class="card-vehicle">' +
              `<p>${formData.vehicle.model}</p>` +
                `<p>${formData.vehicle.plate}</p>`+
                '</div>' +
            '</div>' +
            '</div>'+
        '</div>'+
        '</br>'+
        'O que deseja fazer?',
      showConfirmButton: true,
      confirmButtonText: 'CONFIRMAR RESERVA',
      confirmButtonColor: '#9a47bb',
      showDenyButton: true,
      denyButtonText: 'CANCELAR RESERVA',
      showCancelButton: true,
      cancelButtonText: 'VOLTAR',
    }).then(function (event) {
      if (event.isDismissed) {
        Swal.fire({
          title: 'Reserva provisória desfeita!',
          icon: 'info',
        });
        e.preventDefault();
        return false;
      }
      if (event.isConfirmed) {
        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          title: 'Reserva confirmada com sucesso!',
          icon: 'success',
        }).then((res) => {
          e.preventDefault();
          registerReservation(formData);
          return true;
        });
      } else {
        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          title: 'Reserva cancelada!',
          icon: 'error',
        }).then((res) => {
          formData.status = 2;
          e.preventDefault();
          registerReservation(formData);
          return true;
        });
      }
    });
  });

// Compare differences between two dates
function getDifferenceDate(date1, date2) {
  const diffInMs = Math.floor(date2 - date1);
  return diffInMs / (1000 * 60);
}

// fetch to send object to back-end
function registerReservation(data) {
  fetch('/reserva', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
