const getHashBuffer = (key: string) =>
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(key));

interface IvData {
  iv: Uint8Array;
  ivStr: string;
}
const generateIvData = (): IvData => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ivStr = Array.from(iv)
    .map((b) => String.fromCharCode(b))
    .join("");
  return { iv, ivStr };
};
const getIvData = (str: string): IvData => {
  const ivStr = atob(str).slice(0, 12);
  const iv = new Uint8Array(Array.from(ivStr).map((ch) => ch.charCodeAt(0)));
  return { iv, ivStr };
};

export async function encrypt(str: string, key: string) {
  const hash = await getHashBuffer(key);
  const { iv, ivStr } = generateIvData();
  const alg = { name: "AES-GCM", iv: iv };
  const cryptoKey = await crypto.subtle.importKey("raw", hash, alg, false, [
    "encrypt",
  ]);
  const ptUint8 = new TextEncoder().encode(str);
  const ctBuffer = await crypto.subtle.encrypt(alg, cryptoKey, ptUint8);
  const ctArray = Array.from(new Uint8Array(ctBuffer));
  const ctStr = ctArray.map((byte) => String.fromCharCode(byte)).join("");
  return btoa(ivStr + ctStr);
}

export async function decrypt(str: string, key: string) {
  const hash = await getHashBuffer(key);
  const { iv } = getIvData(str);
  const alg = { name: "AES-GCM", iv: iv };
  const cryptoKey = await crypto.subtle.importKey("raw", hash, alg, false, [
    "decrypt",
  ]);
  const ctStr = atob(str).slice(12);
  const ctUint8 = new Uint8Array(
    Array.from(ctStr).map((ch) => ch.charCodeAt(0))
  );
  try {
    const plainBuffer = await crypto.subtle.decrypt(alg, cryptoKey, ctUint8);
    const plaintext = new TextDecoder().decode(plainBuffer);
    return plaintext;
  } catch (e) {
    throw new Error("Decrypt failed");
  }
}
