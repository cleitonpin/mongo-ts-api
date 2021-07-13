import { Document } from "mongoose";
import { IUserDocument } from "./users.type";

export async function setCreatedAt(this: IUserDocument): Promise<void> {
    const now = new Date();
    if (!this.createdAt || this.createdAt < now) {
        this.createdAt = now;
        await this.save();
    }
}
export async function sameEmail(this: IUserDocument): Promise<Document[]> {
    return this.model("user").find({ email: this.email });
}