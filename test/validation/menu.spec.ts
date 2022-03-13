import validation from "../../src/validation/menu";
import { Request, Response } from 'express'

const mockRes = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Menu Validation', () => {
    let body: any
    let params: any
    let req = {} as Request
    let res = mockRes()
    let next = jest.fn()
    beforeEach(() => {
        body = {
            name: 'Test',
            relatedId: 'Test',
        }
        params = {
            id: "622deaa74f88f7569ca1d9cc"
        }
        next = jest.fn()
    })
    describe('upsert validation', () => {
        test('Should return success', async () => {
            req.body = body
            await validation.upsert(req, res, next)
            expect(next).toBeCalledTimes(1)
        })
        test('Should return error', async () => {
            req.body = {}
            await validation.upsert(req, res, () => null)
            expect(res.status).toBeCalledWith(400)
        })
      })

    describe('objectId validation', () => {
        test('Should return success', async () => {
            req.params = params
            validation.objectId(req, res, next)
            expect(next).toBeCalledTimes(1)
        })
        test('Should return error', async () => {
            req.params = {}
            validation.objectId(req, res, () => null)
            expect(res.status).toBeCalledWith(400)
        })
      })
})
