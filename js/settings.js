import { updateUsersToShow } from './userService.js'

export class Settings {
  constructor() {
    this.gender = 'both'
    this.sortType = 'A-Z'
  }

  applySettings({ target }) {
    switch (target.name) {
      case 'gender':
        this.gender = target.value
        break;
      case 'sort-type':
        this.sortType = target.value
        break;
    }

    updateUsersToShow()
  }
}


export const settings = new Settings()
document.querySelector('#settings-form').addEventListener('change', (event) => { settings.applySettings(event) })
