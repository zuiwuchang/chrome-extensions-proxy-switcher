import { Action, StorageGetRequest } from "./types";
import { send } from "../client";
export function storageLocalGet(target: string, keys: StorageGetRequest) {
    return send<StorageGetRequest, Record<string, any>>({
        target: target,
        action: Action.LocalGet,
        data: keys,
    })
}
export function storageLocalSet(target: string, keys: Record<string, any>) {
    return send<Record<string, any>, void>({
        target: target,
        action: Action.LocalSet,
        data: keys,
    })
}
