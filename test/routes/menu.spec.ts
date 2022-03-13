import request from "supertest";
import routes from "../../src/routes/menu";
import mongoose from 'mongoose'
import express from "express";
import Menu from '../../src/models/menu'

describe('Menu Routes', () => {
  let app: any
  let relatedId: string
  let client: any
  let payload: any

  beforeAll(async () => {
    app = express()
    const VERSION = process.env.VERSION || 'v1'
    app.use(express.json())
    app.use(`/${VERSION}/menu`, routes)
    client = await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/local')
    payload = {
      name: 'test'
    }
  })

  beforeEach(async () => {
    await Menu.deleteMany({})
  })

  afterAll(async () => {
    client.disconnect()
  })

  describe('POST /v1/menu', () => {
    test('Should return 200 on CREATE Menu', async () => {
      const retornoCreate = await request(app)
        .post('/v1/menu')
        .send(payload)
        .expect(201)
      expect(retornoCreate.body.id).toBeTruthy()
      relatedId = retornoCreate.body.id
    })
    test('Should return 200 on CREATE Menu with relatedId', async () => {
      const retornoWithRelatedId = await request(app)
        .post('/v1/menu')
        .send({
          ...payload,
          relatedId: relatedId
        })
        .expect(201)
      expect(retornoWithRelatedId.body.id).toBeTruthy()
    })
  })
  describe('GET /v1/menu', () => {
    test('Should return 200 on GET Menu', async () => {
      const retorno = await request(app)
        .get('/v1/menu')
        .expect(200)
      expect(retorno.body.length).toEqual(0)
    })
    test('Should return 200 on GET Menu', async () => {
      const retornoCreate = await request(app)
        .post('/v1/menu')
        .send(
          { name: 'test' }
        )
        .expect(201)
      expect(retornoCreate.body.id).toBeTruthy()
      relatedId = retornoCreate.body.id
      const retornoWithRelatedId = await request(app)
        .post('/v1/menu')
        .send({
          name: 'test 2',
          relatedId: relatedId
        })
        .expect(201)
      expect(retornoWithRelatedId.body.id).toBeTruthy()

      const retorno = await request(app)
        .get('/v1/menu')
        .expect(200)
      expect(retorno.body.length).toEqual(1)
      expect(retorno.body[0].name).toBeTruthy()
      expect(retorno.body[0].name).toEqual('test')
      expect(retorno.body[0].submenus.length).toEqual(1)
      expect(retorno.body[0].submenus[0].name).toBeTruthy()
      expect(retorno.body[0].submenus[0].name).toEqual('test 2')
    })
  })
  describe('DELETE /v1/menu', () => {
    test('Should return 200 on GET Menu', async () => {
      const payload = {
        name: 'test'
      }
      const retornoCreate = await request(app)
        .post('/v1/menu')
        .send(payload)
        .expect(201)
      const retornoDelete = await request(app)
        .delete(`/v1/menu/${retornoCreate.body.id}`)
        .expect(200)
      expect(retornoDelete.body.id).toEqual(retornoCreate.body.id)
    })
    test('Should return 400 on GET Menu', async () => {
      await request(app)
        .delete(`/v1/menu/622de9bcfbf4264a6e1e3131`)
        .expect(400)
    })
  })
})