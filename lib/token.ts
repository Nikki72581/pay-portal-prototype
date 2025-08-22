export function base64UrlEncode(data: string): string {
  if (typeof window !== "undefined" && window.btoa) {
    return window.btoa(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return Buffer.from(data, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlDecode(data: string): string {
  const b64 = data.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - data.length % 4) % 4);
  if (typeof window !== "undefined" && window.atob) {
    return window.atob(b64);
  }
  return Buffer.from(b64, "base64").toString("utf8");
}

export function encodeToken(payload: any): string {
  return base64UrlEncode(JSON.stringify(payload));
}

export function decodeToken<T = any>(token: string): T {
  const json = base64UrlDecode(token);
  return JSON.parse(json) as T;
}
