import $ from 'jquery'
import 'bootstrap'

const GOOGLE_SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbwsBbCb3vAYvSU5IAExTgAP3Ul65gBR7TB0hnO_mvmEOWPpwvkv1FEO4uWXHBLaB3z_Sw/exec'

window.onload = () => {
  console.log('window onload')

  console.log('')
  
  const btnSend = $('#btn-send')[0]
  btnSend.addEventListener('click', () => {
    const form = $('.form-sheet')[0]
    console.log(form.name.value)
    console.log(form.uuid.value)
    console.log(form.phone.value)
    console.log(form.person.value)

    $.ajax({
      'url': GOOGLE_SHEET_API_URL,
      data: {
        'name': form.name.value,
        'uuid': form.uuid.value,
        'phone': form.phone.value,
        'person': form.person.value
      },
      success: function(response) {
        if(response === 'success') {
          alert('送出成功')
          // setTimeout(() => {
          //   location.reload()
          // },  2000)
        }
      }
    })
  })
}