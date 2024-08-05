type FormDataType = Record<string, string | boolean | number>;

const parseFormData = (formData: FormDataType) => {
  const parsedData: Record<string, any> = {};

  Object.keys(formData).forEach(key => {
    const value = formData[key];
    const keys = key.split(/[.[\]]+/).filter(Boolean);

    keys.reduce((acc, currKey, index) => {
      let parsedValue: any = value;
      if (parsedValue === 'true') {
        parsedValue = true;
      } else if (parsedValue === 'false') {
        parsedValue = false;
      } else if (!isNaN(parsedValue as any)) {
        parsedValue = Number(parsedValue);
      }

      if (index === keys.length - 1) {
        acc[currKey] = parsedValue;
      } else {
        if (acc[currKey] === undefined) {
          acc[currKey] = isNaN(Number(keys[index + 1])) ? {} : [];
        }
      }
      return acc[currKey];
    }, parsedData);
  });

  return parsedData;
};

export { parseFormData };
