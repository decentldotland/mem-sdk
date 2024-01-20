const i = "https://mem-cli-server-482a8c7c1299.herokuapp.com/mem-cli";
function p(o, t) {
  const n = o.split("").map((s) => s.charCodeAt(0)), e = {
    contractOwner: "",
    contentType: "application/javascript",
    contractSrc: n,
    initState: t
  }, a = [
    { name: "Content-Type", value: "application/javascript" },
    { name: "Owner", value: "" },
    { name: "App-Name", value: "EM" },
    { name: "Type", value: "Serverless-Function" },
    { name: "EM-Bundled", value: "true" },
    { name: "Size", value: String(n.length) }
  ];
  return { dataTx: e, tags: a };
}
class u {
  async readFunction(t) {
    const n = `https://api.mem.tech/api/state/${t}`, a = await fetch(n, { headers: {
      "Content-Type": "application/json"
    } });
    if (a.ok)
      return await a.json();
    throw new Error(a.statusText);
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
    const e = JSON.stringify(p(t, n)), s = await fetch(i, {
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
    if (s.ok)
      return { id: (await s.json()).txid };
    throw new Error(s.statusText);
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
