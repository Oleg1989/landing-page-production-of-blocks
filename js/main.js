let selector = document.querySelector("#phoneNumber")
let im = new Inputmask("+3(999) 999-99-99")
im.mask(selector)

let validation = new JustValidate("form")

validation.addField("#userName", [
  {
    rule: "required",
    errorMessage: "Введіть ім'я!"
  },
  {
    rule: "minLength",
    value: 2,
    errorMessage: "Мінімум 2 символа!"
  }
]).addField("#phoneNumber", [
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length > 0)
    },
    errorMessage: 'Введіть номер телефона'
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length === 10)
    },
    errorMessage: 'Введіть номер телефона повністю'
  }
]).onSuccess(async function () {
  let data = {
    userName: document.getElementById("userName").value,
    phoneNumber: selector.inputmask.unmaskedvalue(),
  }

  let response = await fetch("mail.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  })

  let result = await response.text()

  alert(result)
  
  document.getElementById("userName").value = '';
  document.getElementById("phoneNumber").value = '';
})
