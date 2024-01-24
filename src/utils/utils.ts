export const TXS_BROADCASTER_URL = `https://mem-cli-server-482a8c7c1299.herokuapp.com/mem-cli`;

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name),
      );
    });
  });
}

export function generateFunctionFormat(sc: string, state: string): any {
  const sourceCode = sc.split("").map((char) => char.charCodeAt(0));

  const dataTx = {
    contractOwner: "",
    contentType: "application/javascript",
    contractSrc: sourceCode,
    initState: state,
  };

  const tags = [
    { name: "Content-Type", value: "application/javascript" },
    { name: "Owner", value: "" },
    { name: "App-Name", value: "EM" },
    { name: "Type", value: "Serverless-Function" },
    { name: "EM-Bundled", value: "true" },
    { name: "Size", value: String(sourceCode.length) },
  ];

  return { dataTx, tags };
}

export async function resolveMemName(funcName: string): Promise<any> {
  try {
    const name: string = funcName.split(".mem")[0];

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "https://api.mem.tech/api/state/GJn1h75nIAyMW5XWgzraL-Ldxr2Zb38WlLEVwk6CBDs",
      { headers },
    );

    if (response.ok) {
      const data = (await response.json())?.names;
      if (name in data) {
        return data[name] as any;
      }
    }
    throw new Error(response.statusText);
  } catch (error) {
    return null;
  }
}
