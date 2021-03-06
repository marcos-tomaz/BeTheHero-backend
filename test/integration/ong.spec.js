const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    try {
      await connection.migrate.latest()
    } catch (error) {
      throw new Error('connection failed')
    }
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('Should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'APA3',
        email: 'contato@apar.com',
        whatsapp: '1100000000',
        city: 'Rio do Sul',
        uf: 'SC',
      })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
