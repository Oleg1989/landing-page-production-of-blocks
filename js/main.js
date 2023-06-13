let selector = document.querySelector("#phoneNumber");
let im = new Inputmask("+3(999) 999-99-99");
im.mask(selector);

let validation = new JustValidate("form");

validation
  .addField("#serviceSelection", [
    {
      rule: "required",
      errorMessage: "Виберіть послугу!",
    },
  ])
  .addField("#userName", [
    {
      rule: "required",
      errorMessage: "Введіть ім'я!",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Мінімум 2 символа!",
    },
  ])
  .addField("#phoneNumber", [
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue();
        return Boolean(Number(phone) && phone.length > 0);
      },
      errorMessage: "Введіть номер телефона!",
    },
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue();
        return Boolean(Number(phone) && phone.length === 10);
      },
      errorMessage: "Введіть номер телефона повністю!",
    },
  ])
  .onSuccess(async function () {
    let data = {
      userName: document.getElementById("userName").value,
      phoneNumber: selector.inputmask.unmaskedvalue(),
      services: document.getElementById("serviceSelection").value,
    };

    document.getElementById("userName").value = "";
    document.getElementById("phoneNumber").value = "";

    const spinner = document.getElementById("spinner");
    spinner.style.visibility = "visible";

    let response = await fetch("mail.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (response.ok) {
      spinner.style.visibility = "hidden";
    }

    let result = await response.text();

    const myModal = new bootstrap.Modal('#exampleModal', {
      keyboard: false
    })

    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = 'Повідомлення з сайту HDblock!';

    const modalBody = document.getElementsByClassName('modal-body');
    modalBody[0].textContent = result;

    myModal.show();
  });
