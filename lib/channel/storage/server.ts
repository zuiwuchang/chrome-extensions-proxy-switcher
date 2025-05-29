import { Context } from "../server";
import { Action, StorageGetRequest } from "./types";

export const StorageAction = Action
export async function storageLocalGet(ctx: Context<StorageGetRequest, Record<string, any>>) {
    ctx.ok(await chrome.storage.local.get(ctx.data))
}
export async function storageLocalSet(ctx: Context<Record<string, any>, void>) {
    await chrome.storage.local.set(ctx.data)
    ctx.ok()
}
