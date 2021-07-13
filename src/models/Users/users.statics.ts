import { IUserDocument, IUserModel } from "./users.type";

export async function findOneOrCreate(
    this: IUserModel,
    userId: string
): Promise<IUserDocument> {
    const record = await this.findOne({ userId });

    if (record) {
        return record
    } 

    return this.create({ userId })
}

export async function findByEmail(
    this: IUserModel,
    email: string
): Promise<Array<IUserDocument>> {
    return this.find({ email })
}