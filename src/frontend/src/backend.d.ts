import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Item {
    id: string;
    name: string;
    description: string;
    image: ExternalBlob;
    price: bigint;
}
export interface backendInterface {
    addItem(id: string, name: string, description: string, price: bigint, image: ExternalBlob): Promise<void>;
    deleteItem(id: string): Promise<void>;
    getItems(): Promise<Array<Item>>;
    processPayment(itemId: string): Promise<bigint>;
}
