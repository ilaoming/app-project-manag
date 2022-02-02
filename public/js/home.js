const API_URL = `http://localhost:3000`;
const tbody = document.getElementById('tbody_container')

//Carga en un select la lista de categorias.
fetch(`${API_URL}/service-order`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach(order => {
        const id = document.createElement('th')
        const entity_name = document.createElement('td')
        const s_date = document.createElement('td')
        const e_date = document.createElement('td')
        const e_days = document.createElement('td')
        const p_days = document.createElement('td')
        const phone = document.createElement('td')
        const mail = document.createElement('td')
        const delivery_address = document.createElement('td')
        const assignee_name = document.createElement('td')
        const service_state = document.createElement('td')
        const tr = document.createElement('tr')
        id.setAttribute('scope','row')

        id.innerHTML = order.id
        entity_name.innerHTML = order.entity_name
        s_date.innerHTML = order.s_date
        e_date.innerHTML = order.e_date
        e_days.innerHTML = order.e_days
        p_days.innerHTML = order.p_days
        phone.innerHTML = order.phone
        mail.innerHTML = order.mail
        delivery_address.innerHTML = order.delivery_address
        assignee_name.innerHTML = order.assignee_name
        service_state.innerHTML = order.service_state

        const td_list = 
        [
          id,
          entity_name,
          s_date,
          e_date,
          e_days,
          p_days,
          phone,
          mail,
          delivery_address,
          assignee_name,
          service_state
        ]

        for (let i = 0; i < td_list.length; i++) {
          tr.appendChild(td_list[i])
        }

        tbody.appendChild(tr)
    });
  });