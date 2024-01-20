const i = "https://mem-cli-server-482a8c7c1299.herokuapp.com/mem-cli";
function p(s, t) {
  const n = s.split("").map((a) => a.charCodeAt(0)), e = {
    contractOwner: "",
    contentType: "application/javascript",
    contractSrc: n,
    initState: t
  }, o = [
    { name: "Content-Type", value: "application/javascript" },
    { name: "Owner", value: "" },
    { name: "App-Name", value: "EM" },
    { name: "Type", value: "Serverless-Function" },
    { name: "EM-Bundled", value: "true" },
    { name: "Size", value: String(n.length) }
  ];
  return { dataTx: e, tags: o };
}
class u {
  async readFunction(t) {
    const n = `https://api.mem.tech/api/state/${t}`, e = await fetch(n);
    if (e.ok)
      return await e.json();
    throw new Error(e.statusText);
  }
  async writeFunction(t, n) {
    const e = "https://api.mem.tech/api/transactions", c = {
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
    }, r = await fetch(e, c);
    if (r.ok)
      return await r.json();
    throw new Error(r.statusText);
  }
  async deployFunction(t, n) {
    const e = JSON.stringify(p(t, n)), a = await fetch(i, {
      method: "post",
      url: i,
      body: e,
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
}
class d extends u {
  async read(t) {
    return await this.readFunction(t);
  }
  async write(t, n) {
    return await this.writeFunction(t, n);
  }
  async deploy(t, n) {
    return await this.deployFunction(t, n);
  }
}
class h extends d {
}
export {
  d as Actions,
  h as Mem
};
