import { model, Schema } from 'mongoose'

interface IMenu {
    _id?: string
    name: string
    relatedId?: string
    dob?: Date
}

const schema = new Schema<IMenu>({
    name: { type: String, required: true },
    relatedId: { type: String, required: false },
    dob: Date,
})

export default model<IMenu>('menu', schema, 'menus')
