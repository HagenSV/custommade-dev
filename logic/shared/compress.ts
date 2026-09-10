import zlib from "zlib";

export function generateShareParams(data: unknown) {
    return generateShareParamsV1(data);
}

export function importData<T>(params: URLSearchParams): T {
    const exportVersion = params.get("string");
    switch (exportVersion){
        case "1":
            return importDataV1<T>(params.get("data"));
        default:
            return importDataV0<T>(params.get("data"));
    }
}

function generateShareParamsV1(data: unknown) {
    const json = JSON.stringify(data);
    const raw = Buffer.from(json,"utf-8");
    const compressed = zlib.deflateSync(raw);
    const shareData = compressed.toString('base64url');
    const params = new URLSearchParams({
        v: "1",
        data: shareData
    })
    return params.toString();
}

function importDataV0<T>(data: string | null): T {
    if (!data) { throw new Error("Data is missing"); }
    const compressed = Buffer.from(data, "base64"); 
    const decompressed = zlib.inflateSync(compressed);
    const text = decompressed.toString("utf-8");
    const json = JSON.parse(text);
    return json as T;
}

function importDataV1<T>(data: string | null): T {
    if (!data){ throw new Error("Data is missing"); }
    const compressed = Buffer.from(data, "base64url"); 
    const decompressed = zlib.inflateSync(compressed);
    const text = decompressed.toString('utf-8');
    const json = JSON.parse(text);
    return json as T;
}