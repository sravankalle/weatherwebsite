console.log('Client-Side Up!')


const formData = document.querySelector('form')
const search = document.querySelector('input')

const one = document.querySelector('#p1')
const two = document.querySelector('#p2')
formData.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    one.textContent = 'Loading...'
    one.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            one.textContent = 'Error finding location'
        }else{
            one.textContent = data.location
            two.textContent = data.forecast
        }
    })
})

})