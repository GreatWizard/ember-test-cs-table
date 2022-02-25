import Controller from '@ember/controller'
import { action } from '@ember/object'

export default class ApplicationController extends Controller {
  model = {
    structure: [
      { key: 'name', label: 'Name' },
      { key: 'device', label: 'Device' },
      { key: 'path', label: 'Path' },
      { key: 'status', label: 'Status', component: 'custom-status' },
    ],
    rows: [
      {
        name: 'smss.exe',
        device: 'Stark',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
        status: 'scheduled',
      },
      {
        name: 'netsh.exe',
        device: 'Targaryen',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
      {
        name: 'uxtheme.dll',
        device: 'Lannister',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
        status: 'available',
      },
      {
        name: 'cryptbase.dll',
        device: 'Martell',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
        status: 'scheduled',
      },
      {
        name: '7za.exe',
        device: 'Baratheon',
        path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
        status: 'scheduled',
      },
    ],
    selectableFunction(items) {
      return items.filter((item) => item.status === 'available')
    },
  }

  @action
  downloadSelected(items) {
    let text = items.map((item) => `[${item.device}] ${item.path}`).join('\n\n')
    alert(text)
  }
}
