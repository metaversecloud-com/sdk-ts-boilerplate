const keys = ["topia", "credentials", "jwt", "requestOptions"];

export const cleanReturnPayload = (payload: any) => {
  console.log("🚀 ~ file: cleanReturnPayload.ts:4 ~ payload:", payload)
  const keyExists = (payload: any) => {
    if (!payload || (typeof payload !== "object" && !Array.isArray(payload))) return payload;

    for (const i in keys) {
      const key = keys[i];
      if (payload.hasOwnProperty(key)) {
        delete payload[key];
      } else if (Array.isArray(payload)) {
        for (let i = 0; i < payload.length; i++) {
          const result = keyExists(payload[i]);
          if (result) delete payload[i][key];
        }
      } else {
        for (const k in payload) {
          const result = keyExists(payload[k]);
          if (result) delete payload[k][key];
        }
      }
    }

    console.log("🚀 ~ file: cleanReturnPayload.ts:26 ~ payload:", payload)
    return payload;
  };
  keyExists(payload);
  return payload;
};
