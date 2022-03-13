import { Request, Response } from 'express'
import Menu from '../models/menu'

const subMenu = (data: any[], id: any): any[] => {
    const submenu = data.filter(item => item.relatedId === id)

    return submenu.map(item => ({
        id: item.id,
        name: item.name,
        submenus: subMenu(data, item.id)
    }))
}

const aninharMenu = (data: any[]): any[] => {
    const base = data.filter(item => !item.relatedId)

    return base.map(item => ({
        id: item.id,
        name: item.name,
        submenus: subMenu(data, item.id)
    }))
}

export default {
    create: async (req: Request, res: Response): Promise<Response> => {
        const { id } = await Menu.create(req.body)

        return res.status(201).json({
            id,
        })
    },
    getAll: async (_: Request, res: Response): Promise<Response> => {
        const menu = await Menu.find()

        const menuAninhado = aninharMenu(menu)

        return res.json(menuAninhado)
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        const menu = await Menu.findOne({ _id: req.params.id })
        /* istanbul ignore next */
        if (!menu || !menu?.id)
            return res.status(400).json({ message: 'Menu not found' })

        await Menu.deleteOne({ _id: menu.id })
        return res.json({
            id: menu.id,
        })
    },
}
