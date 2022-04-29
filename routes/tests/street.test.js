const request = require('supertest')
const app = require('../../index')

describe('Получить все улицы', () => {
  test('get all', async () => {
    const res = await request(app).get('/street')
    expect(res.status).toEqual(200)
  })
})

let example = {
  name: "lab5", x: 1, y:1,
}

describe('Добавить новую улицу', () => {
  test('add new', async () => {
    const res = await request(app).post('/street/add').send(example)
    expect(res.status).toBe(200)
  })
})

let update = {
  streetId: "6268f51f2280e45705754be2",
  name: "test update api",
  x: 10,
  y:10
}

describe('Обновить данные улицы', () => {
  test('update', async () => {
    const res = await request(app).post('/street/update').send(update)
    expect(res.status).toEqual(200)
  })
})


describe('Удалить выбранную улицу', () => {
  it('del work', async () => {
    const res = await request(app).post('/street/delete').send({id: "6268f51f2280e45705754be2"})
    expect(res.status).toEqual(200)
  })
})
