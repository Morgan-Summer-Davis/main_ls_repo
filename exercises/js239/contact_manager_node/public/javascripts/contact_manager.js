let url = "https://6e5a9eccc277483cb5d076562254fb0a.vfs.cloud9.us-east-1.amazonaws.com:8080/api/";
function resetDatabase() {
  fetch(url + 'contacts',
    {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
      },
  })
  .then(response => response.json())
  .then(data => {
    data.map(contact => contact.id).forEach(id => {
      return fetch(url + 'contacts/' + id,
      {
        method: 'DELETE',
      });
    });
  })
  .then(() => {
    let seed = [{"id":1,"full_name":"Naveed Fida","email":"nf@example.com",
                "phone_number":"12345678901","tags":"work,friend"},
                {"id":2,"full_name":"Victor Reyes","email":"vpr@example.com",
                "phone_number":"09876543210","tags":"work,friend"},
                {"id":3,"full_name":"Pete Hanson","email":"ph@example.com",
                "phone_number":"54321098761","tags":null}]
                
    seed.forEach(contact => {
      fetch(url + 'contacts',
      {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
          'Content-Type': 'application/json',
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let contacts        = document.getElementById('contacts');
  let formDiv         = document.getElementById('form_div');
  let searchNotice    = document.getElementById('search_notice');
  let menu            = document.getElementById('menu');
  let contactTemplate = Handlebars.compile(document.getElementById('contact').innerHTML);

  function nodeFromHTML(html) {
    let template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content;
  }
  
  function populateContacts() {
    while (contacts.children.length > 0) contacts.removeChild(contacts.children[0]);
    
    return fetch(url + 'contacts',
    {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      data.map(contact => { if (contact.tags) contact.tags = contact.tags.split(',') });
      data.forEach(contact => {
        contacts.appendChild(nodeFromHTML(contactTemplate(contact)));
      });
    });
  }
  
  function filterContacts(testString, key) {
    if (key === 'tag') testString = '^' + testString + '$';
    let regex = new RegExp(testString, 'i');
    
    Array.from(contacts.children).forEach(child => child.style.display = 'none');
    searchNotice.style.display = 'none';
    searchNotice.querySelector('span').textContent = testString;
    // contacts.
    
    let elems = Array.from(contacts.getElementsByClassName(key))
                     .filter(elem => regex.test(elem.textContent));
                     
    elems.forEach(elem => {
      elem.closest('div').style.display = 'inline-block';
    });
    
    if (elems.length === 0) searchNotice.style.display = 'block';
  }
  
  function createForm(id) {
    let contact   = document.getElementById(id);
    let formH1    = document.getElementById('form_div').querySelector('h1');
    let formName  = document.getElementById('form_name');
    let formEmail = document.getElementById('form_email');
    let formPhone = document.getElementById('form_phone');
    let formTags  = document.getElementById('form_tags');
    
    if (!id) {
      formH1.textContent = 'Create Contact';
      formName.value                       = '';
      formEmail.value                      = '';
      formPhone.value                      = '';
      formTags.value                       = '';
      formDiv.querySelector('form').action = 'contacts';
    } else {
      formH1.textContent = 'Edit Contact';
      formName.value     = contact.querySelector('.full_name').textContent;
      formEmail.value    = contact.querySelector('.phone_number').textContent;
      formPhone.value    = contact.querySelector('.email').textContent;
      formTags.value     = Array.from(contact.querySelectorAll('.tag'))
                                .map(tag => tag.textContent).join(', ');
      formDiv.querySelector('form').action = 'contacts/' + id;
    }
    
    toggleDiv(formDiv);
    toggleDiv(menu);
    toggleDiv(contacts);
  }
  
  function toggleDiv(container) {
    if (!container.classList.contains('active')) {
      container.classList.add('active');
      container.style.height = 'auto';

      let height = container.clientHeight + "px";

      container.style.height = '0px';

      setTimeout(function () {
        container.style.height = height;
      }, 0);
    } else {
      container.style.height = '0px';

      container.addEventListener('transitionend', function () {
        container.classList.remove('active');
      }, {
        once: true
      });
    }
  }
  
  document.getElementById('search').addEventListener('keyup', event => {
    filterContacts(event.currentTarget.value, 'full_name');
  });
  
  document.getElementById('add_contact').addEventListener('click', () => createForm());
  
  contacts.addEventListener('click', event => {
    if (!event.target.classList.contains('tag')) return;
    
    event.preventDefault();
    filterContacts(event.target.textContent, 'tag');
  })
  
  contacts.addEventListener('click', event => {
    if (!event.target.classList.contains('delete')) return;
    
    let id = event.target.closest('div').id;
    fetch(url + 'contacts/' + id,
    {
      method: 'DELETE',
    }).then(populateContacts());
  });
  
  contacts.addEventListener('click', event => {
    if (!event.target.classList.contains('edit')) return;
    
    createForm(event.target.closest('div').id);
  });
  
  document.getElementById('cancel').addEventListener('click', () => {
    event.preventDefault();
    toggleDiv(formDiv);
    toggleDiv(menu);
    toggleDiv(contacts);
  });
  
  formDiv.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    
    let action = event.currentTarget.getAttribute('action');
    let method = action === 'contacts' ? 'POST' : 'PUT';
    let data = {
      full_name: document.getElementById('form_name').value,
      email: document.getElementById('form_email').value,
      phone_number: document.getElementById('form_phone').value,
      tags: document.getElementById('form_tags').value.replace(/, /g, ','),
    }
    
    if (action === 'contacts') {
      method = 'POST';
    } else {
      method = 'PUT';
      data.id = action.match(/(?<=contacts\/).+/)[0];
    }
    
    fetch(url + action,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => populateContacts());
  });
  
  document.addEventListener('keyup', () => toggleDiv(menu));
  
  populateContacts().then(() => {
    toggleDiv(contacts);
    toggleDiv(menu);
  });
});