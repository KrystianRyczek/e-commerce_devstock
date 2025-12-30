export const imageLoader = (
  config: { src: string; width: number; quality?: number },
  transformations: string
) =>{
  if (transformations === "") {
    return config.src;
  }
  const urlStart = config.src.split("upload/")[0];
  const urlEnd = config.src.split("upload/")[1];

  return `${urlStart}upload/${transformations}/${urlEnd}`;
}