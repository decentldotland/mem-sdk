const c = "https://mem-cli-server-482a8c7c1299.herokuapp.com/mem-cli";
function h(r, t) {
  const n = r.split("").map((a) => a.charCodeAt(0)), s = {
    contractOwner: "",
    contentType: "application/javascript",
    contractSrc: n,
    initState: t
  }, e = [
    { name: "Content-Type", value: "application/javascript" },
    { name: "Owner", value: "" },
    { name: "App-Name", value: "EM" },
    { name: "Type", value: "Serverless-Function" },
    { name: "EM-Bundled", value: "true" },
    { name: "Size", value: String(n.length) }
  ];
  return { dataTx: s, tags: e };
}
async function p(r) {
  var t;
  try {
    const n = r.split(".mem")[0], e = await fetch("https://api.mem.tech/api/state/GJn1h75nIAyMW5XWgzraL-Ldxr2Zb38WlLEVwk6CBDs", { headers: {
      "Content-Type": "application/json"
    } });
    if (e.ok) {
      const a = (t = await e.json()) == null ? void 0 : t.names;
      if (n in a)
        return a[n];
    }
    throw new Error(e.statusText);
  } catch {
    return null;
  }
}
class u {
  constructor(t) {
    this.network = t.network;
  }
  async readFunction(t) {
    if (t.endsWith(".mem") && (t = await p(t)), this.network === "mainnet") {
      const n = `https://api.mem.tech/api/state/${t}`, e = await fetch(n, { headers: {
        "Content-Type": "application/json"
      } });
      if (e.ok)
        return await e.json();
      throw new Error(e.statusText);
    }
    if (this.network === "testnet") {
      const n = `https://mem-testnet.xyz/state/${t}`, e = await fetch(n, { headers: {
        "Content-Type": "application/json"
      } });
      if (e.ok)
        return await e.json();
      throw new Error(e.statusText);
    }
  }
  async writeFunction(t, n) {
    if (t.endsWith(".mem") && (t = await p(t)), this.network === "mainnet") {
      const s = "https://api.mem.tech/api/transactions", o = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          functionId: t,
          inputs: [
            {
              input: n
            }
          ]
        })
      }, i = await fetch(s, o);
      if (i.ok)
        return await i.json();
      throw new Error(i.statusText);
    }
    if (this.network === "testnet") {
      const s = "https://mem-testnet.xyz/write", a = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          function_id: t,
          input: JSON.stringify(n)
        })
      }, o = await fetch(s, a);
      if (o.ok)
        return await o.json();
      throw new Error(o.statusText);
    }
  }
  async deployFunction(t, n) {
    if (this.network === "mainnet") {
      const s = JSON.stringify(h(t, n)), a = await fetch(c, {
        method: "post",
        url: c,
        body: s,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        maxContentLength: 1e8,
        maxBodyLength: 1e9
      });
      if (a.ok)
        return { id: (await a.json()).txid };
      throw new Error(a.statusText);
    }
    if (this.network === "testnet") {
      const s = {
        method: "post",
        url: "https://mem-testnet.xyz/deploy",
        body: JSON.stringify({
          src: t,
          state: n
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        maxContentLength: 1e8,
        maxBodyLength: 1e9
      }, e = await fetch("https://mem-testnet.xyz/deploy", s);
      if (e.ok)
        return { id: (await e.json()).function_id };
      throw new Error(e.statusText);
    }
  }
  async forkFunction(t, n, s) {
    if (this.network === "mainnet") {
      const e = s ? `https://molext1.com/mem/fork/${t}/${n}/${s}` : `https://molext1.com/mem/fork/${t}/${n}`, o = await fetch(e, { headers: {
        "Content-Type": "application/json"
      } });
      if (o.ok)
        return await o.json();
      throw new Error(o.statusText);
    }
  }
  async kvFunction(t) {
    if (this.network === "mainnet") {
      const n = `https://mem-api.com/kv/${t}`, e = await fetch(n, { headers: {
        "Content-Type": "application/json"
      } });
      if (e.ok)
        return await e.json();
      throw new Error(e.statusText);
    }
  }
}
class m extends u {
  async read(t) {
    return await this.readFunction(t);
  }
  async write(t, n) {
    return await this.writeFunction(t, n);
  }
  async deploy(t, n) {
    return await this.deployFunction(t, n);
  }
  async fork(t, n, s) {
    return await this.forkFunction(t, n, s);
  }
  async kvGet(t) {
    return await this.kvFunction(t);
  }
}
class d extends m {
}
export {
  m as Actions,
  d as Mem
};
