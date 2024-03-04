const keys = ["topia", "credentials", "jwt", "requestOptions"];

export const cleanReturnPayload = (payload) => {
  const keyExists = (payload) => {
    if (!payload || (typeof payload !== "object" && !Array.isArray(payload))) return payload;

    for (const i in keys) {
      const key = keys[i];
      if (payload.hasOwnProperty(key)) {
        delete payload[key];
      } else if (Array.isArray(payload)) {
        for (let i = 0; i < payload.length; i++) {
          const result = keyExists(payload[i], key);
          if (result) delete payload[i][key];
        }
      } else {
        for (const k in payload) {
          const result = keyExists(payload[k], key);
          if (result) delete payload[k][key];
        }
      }
    }

    return payload;
  };
  keyExists(payload);
  return payload;
};
