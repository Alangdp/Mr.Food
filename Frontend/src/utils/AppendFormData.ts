export default function objectToFormData<T extends Record<string, any>>(
  obj: T,
  rootName: string = '',
  ignoreList: string[] = [],
): FormData {
  const formData = new FormData();

  function appendFormData(data: any, root: string): void {
    if (!ignore(root)) {
      root = root || '';
      if (data instanceof File) {
        formData.append(root, data);
      } else if (Array.isArray(data)) {
        data.forEach((item, index) => {
          appendFormData(item, `${root}[${index}]`);
        });
      } else if (typeof data === 'object' && data !== null) {
        Object.keys(data).forEach(key => {
          const value = data[key];
          if (root === '') {
            appendFormData(value, key);
          } else {
            appendFormData(value, `${root}.${key}`);
          }
        });
      } else {
        if (data !== null && data !== undefined) {
          formData.append(root, data);
        }
      }
    }
  }

  function ignore(root: string): boolean {
    return Array.isArray(ignoreList) && ignoreList.includes(root);
  }

  appendFormData(obj, rootName);

  return formData;
}
