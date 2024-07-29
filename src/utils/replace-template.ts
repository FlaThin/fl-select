
type replaceTemplateProps = {
  template: string,
  values: string
}

export function replaceTemplate({ template, values }: replaceTemplateProps) {
  return template.replace(/{([^{}]*)}/g, function (match, key) {
    return typeof values[key] !== 'undefined' ? values[key] : match;
  });
}