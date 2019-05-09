/* eslint-disable compat/compat */
import moment from 'moment';
import { Random } from 'mockjs';

const nodes = [{
  id: 'pw-001',
  name: 'Power Total',
  description: 'Total Power consumption of the whole building',
  type: 'power',
  tags: ['Power', 'Total'],
}, {
  id: 'pw-002',
  name: 'Power AC',
  description: 'Total Power consumption of the air conditioner',
  type: 'power',
  tags: ['Power'],
}, {
  id: 'wt-001',
  name: 'Water Total',
  description: 'Total Water consumption of the whole building',
  type: 'water',
  tags: ['Water', 'Total'],

}, {
  id: 'tmp-101',
  name: 'Room 101 Temp',
  description: 'Room temperature of Room 101',
  type: 'temp',
  tags: ['Temp', 'Floor 1'],
  attribute: {
    location: "ROOM 101"
  }
}, {
  id: 'tmp-102',
  name: 'Room 102 Temp',
  description: 'Room temperature of Room 102',
  type: 'temp',
  tags: ['Temp', 'Floor 1'],
  attribute: {
    location: "ROOM 102"
  }
}, {
  id: 'tmp-201',
  name: 'Room 201 Temp',
  description: 'Room temperature of Room 201',
  type: 'temp',
  tags: ['Temp', 'Floor 2'],
  attribute: {
    location: "ROOM 201"
  }
}, {
  id: 'tmp-202',
  name: 'Room 202 Temp',
  description: 'Room temperature of Room 202',
  type: 'temp',
  tags: ['Temp', 'Floor 2'],
  attribute: {
    location: "ROOM 202"
  }
}, {
  id: 'tmp-301',
  name: 'Room 301 Temp',
  description: 'Room temperature of Room 301',
  type: 'temp',
  tags: ['Temp', 'Floor 3'],
  attribute: {
    location: "ROOM 301"
  }
}, {
  id: 'tmp-302',
  name: 'Room 302 Temp',
  description: 'Room temperature of Room 302',
  type: 'temp',
  tags: ['Temp', 'Floor 3'],
  attribute: {
    location: "ROOM 302"
  }
}, {
  id: 'lt-101',
  name: 'Room 101 Light',
  description: 'Room light control of Room 101',
  type: 'light',
  tags: ['Light', 'Floor 1'],
  attribute: {
    location: "ROOM 101"
  }
}, {
  id: 'lt-102',
  name: 'Room 102 Light',
  description: 'Room light control of Room 102',
  type: 'light',
  tags: ['Light', 'Floor 1'],
  attribute: {
    location: "ROOM 102"
  }
}, {
  id: 'lt-201',
  name: 'Room 201 Light',
  description: 'Room light control of Room 201',
  type: 'light',
  tags: ['Light', 'Floor 2'],
  attribute: {
    location: "ROOM 201"
  }
}, {
  id: 'lt-202',
  name: 'Room 202 Light',
  description: 'Room light control of Room 202',
  type: 'light',
  tags: ['Light', 'Floor 2'],
  attribute: {
    location: "ROOM 202"
  }
}, {
  id: 'lt-301',
  name: 'Room 301 Light',
  description: 'Room light control of Room 301',
  type: 'light',
  tags: ['Light', 'Floor 3'],
  attribute: {
    location: "ROOM 301"
  }
}, {
  id: 'lt-302',
  name: 'Room 302 Light',
  description: 'Room light control of Room 302',
  type: 'light',
  tags: ['Light', 'Floor 3'],
  attribute: {
    location: "ROOM 302"
  }
}]

let shadows = [
  { id: 'pw-001', name: 'Power Total', status: true,  updateTime: moment(), type: 'power' },
  { id: 'pw-002', name: 'Power AC',    status: true, updateTime: moment(), type: 'power' },
  { id: 'wt-001', name: 'Water Total', status: true,  updateTime: moment(), type: 'water' },
  { id: 'tmp-101', name: 'Room 101 Temp', status: true, updateTime: moment(), type: 'temp' },
  { id: 'tmp-102', name: 'Room 102 Temp', status: true, updateTime: moment(), type: 'temp' },
  { id: 'tmp-201', name: 'Room 201 Temp', status: true, updateTime: moment(), type: 'temp' },
  { id: 'tmp-202', name: 'Room 202 Temp', status: true, updateTime: moment(), type: 'temp' },
  { id: 'tmp-301', name: 'Room 301 Temp', status: true, updateTime: moment(), type: 'temp' },
  { id: 'tmp-302', name: 'Room 302 Temp', status: true, updateTime: moment(), type: 'temp' },
  { id: 'lt-101', name: 'Room 101 Light', status: true, updateTime: moment(), type: 'light' },
  { id: 'lt-102', name: 'Room 102 Light', status: true, updateTime: moment(), type: 'light' },
  { id: 'lt-201', name: 'Room 201 Light', status: true, updateTime: moment(), type: 'light' },
  { id: 'lt-202', name: 'Room 202 Light', status: true, updateTime: moment(), type: 'light' },
  { id: 'lt-301', name: 'Room 301 Light', status: true, updateTime: moment(), type: 'light' },
  { id: 'lt-302', name: 'Room 302 Light', status: true, updateTime: moment(), type: 'light' }
]

const randomShadow = shadow => {
  if (Math.random()>0.95)
    return { ...shadow, status: false, value: undefined }
  switch (shadow.type) {
    case 'power':
      return { ...shadow, value: Random.float(50, 90, 0, 1), unit: 'kW', min: 0, max: 100 };
    case 'water':
      return { ...shadow, value: Random.float(0, 6, 0, 1), unit: 'm3/s', min: 0, max: 10 };
    case 'temp':
      return { ...shadow, value: Random.float(10, 30, 0, 1), unit: '°C', min: 0, max: 30 };
    case 'light':
      return { ...shadow, value: Math.random()>0.4 ? 'on' : 'off' };
    default:
      return shadow;
  }
}

const mockShadows = shadows => {
  shadows.forEach(item => {
    if (moment().diff(item.updateTime, 'seconds') > 5) {
        item = randomShadow(item)
        item.status = true
        item.updateTime = moment()
    }
  })
  return shadows
}

const mockShadow = (shadows, id) => {
  let shadow = shadows.find(item => item.id === id)
  if (moment().diff(shadow.updateTime, 'seconds') > 5) {
      shadow = randomShadow(shadow)
      shadow.updateTime = moment()
  }
  return shadow
}

export default {
  'GET /api/nodes': (req, res) => res.json(nodes),
  'GET /api/nodes/:id': (req, res) => res.json(nodes.find(item => item.id === req.params.id)),
  'GET /api/shadows/': (req, res) => res.json(mockShadows(shadows)),
  'GET /api/shadows/:id': (req, res) => res.json(mockShadow(shadows, req.params.id)),
  'GET /api/nodes/:id/shadow': (req, res) => res.json(shadows[req.params.id])
}
