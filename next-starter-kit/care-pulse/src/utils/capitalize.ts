const capitalize = ([first, ...rest]: string, locale?: string) => first.toLocaleUpperCase(locale) + rest.join('');

export default capitalize;
