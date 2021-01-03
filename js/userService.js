import { User, loadedUsers } from './users.js'
import { settings } from './settings.js'

export async function loadUsers(amount) {
  const usersURL = `https://randomuser.me/api/?results=${amount}`
  const response = await fetch(usersURL)
  const usersJSON = await response.json()
  const usersArray = usersJSON.results

  usersArray.forEach(loadedUser => {
    const id = loadedUsers.length
    const newUser = new User({ ...loadedUser, id })
    loadedUsers.push(newUser)
  })
  updateUsersToShow()
}

export function peekUser({ target }) {
  const targetElement = target.closest('.user')
  if (targetElement) {
    const id = target.closest('.user').id
    const clickedUser = loadedUsers.find(user => user.id === parseInt(id))
    document.body.appendChild(clickedUser.expandedHtmlMarkUp)
  }
}

export function closePeekedUser({ target }) {
  if (target.id === 'expanded-card') {
    document.body.removeChild(target)
  } else if (target.id === 'big-close-button') {
    document.body.removeChild(document.querySelector('#expanded-card'))
  }
}

export function updateUsersToShow() {
  // Filtering block
  const tempUserArr = loadedUsers.filter(loadedUser => {
    if (settings.gender !== 'both') {
      if (loadedUser.gender !== settings.gender) {
        return false
      }
    }
    if (!(loadedUser.firstName + ' ' + loadedUser.lastName).toLowerCase().includes(settings.nameFilter)) {
      return false
    }
    if (settings.ageFilter) {
      if (!(loadedUser.age === settings.ageFilter)) {
        return false
      }
    }
    return true
  })

  // Sorting block
  switch (settings.sortType) {
    case 'A-Z':
      tempUserArr.sort(function (a, b) {
        if (a.firstName > b.firstName) {
          return 1;
        }
        if (a.firstName < b.firstName) {
          return -1;
        }
        return 0;
      });
      break;
    case 'Z-A':
      tempUserArr.sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return 1;
        }
        if (a.firstName > b.firstName) {
          return -1;
        }
        return 0;
      })
      break;
    case 'ageAsc':
      tempUserArr.sort(function (a, b) {
        return a.age - b.age;
      })
      break;
    case 'ageDesc':
      tempUserArr.sort(function (a, b) {
        return b.age - a.age;
      })
      break;
  }


  const usersContainer = document.querySelector('.users')
  const tempContainer = document.createElement('div')
  tempContainer.classList.add('temp-container')
  tempUserArr.forEach(loadedUser => {
    tempContainer.appendChild(loadedUser.htmlMarkUp)
  })

  const existingContainer = document.querySelector('.temp-container')
  if (existingContainer) {
    usersContainer.replaceChild(tempContainer, existingContainer)
  } else {
    usersContainer.appendChild(tempContainer)
  }
}
