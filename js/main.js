import { loadUsers } from './userService.js'
import { peekUser, closePeekedUser } from './userService.js'
import { Settings } from './settings.js'

const startingUsersAmount = 10


const addMoreButton = document.querySelector('#addUsers')

document.addEventListener('click', peekUser)
document.addEventListener('click', closePeekedUser)


addMoreButton.addEventListener('click', () => { loadUsers(5) })

loadUsers(startingUsersAmount)
