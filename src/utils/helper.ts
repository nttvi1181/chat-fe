export const hash = function (str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

// ham nay nhan vao 1 mang string id va tra ra 1 id duy nhat
export const createConversationId = function (arrIds: Array<string>) {
  let sum = 0;
  for (var i = 0; i < arrIds.length; i++) {
    sum += hash(arrIds[i]);
  }
  return sum.toString();
};

export const characterMaps: any = {
  "&nbsp;": " ",
  "\n": " ",
};

const encodedString = (str: string) => {
  let newStr = str.trim();
  Object.entries(characterMaps).forEach((value) => {
    const regex = new RegExp(`(${value[0]})`, "gim");
    newStr = newStr.replace(regex, `${value[1] || " "}`);
  });
  return newStr;
};
export const ORIGIN_TEXT = /(<([^>]+)>)/gi;

export const getUrlLinks = (text: string) => {
  if (!text) return [];
  const links: Array<string> = [];
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  const textOrigin = encodedString(text);
  textOrigin.split(" ").forEach((content) => {
    if (urlRegex.test(content)) {
      const origanalText = content.replace(ORIGIN_TEXT, "");
      links.push(origanalText);
    }
  });
  return links;
};

export const setURL = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    const urlOrigin = url.replace(ORIGIN_TEXT, "");
    return `<a href="${urlOrigin}" target="_blank" rel="noopener" class="link_href_post_details">${urlOrigin}</a>`;
  });
};

export function convertNumberToString(num: number | string) {
  return num
    .toString() // convert number to string
    .split("") // convert string to array of characters
    .map(Number) // parse characters as numbers
    .map((n) => (n || 10) + 64) // convert to char code, correcting for J
    .map((c) => String.fromCharCode(c)) // convert char codes to strings
    .join(""); // join values together
}
export const dowloadFile = (
  urlFile: string,
  type = "image/jpeg",
  name = "file"
) => {
  fetch(urlFile, {
    method: "GET",
    // headers: {
    //   "Content-Type": type,
    // },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob], { type: type }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      link?.parentNode?.removeChild(link);
    });
};

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getThumbailVideo = (
  urlVideo: string,
  width: number,
  height: number,
  isRevokeUrl?: boolean
) =>
  new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const video = document.createElement("video");
    video.setAttribute("crossorigin", "anonymous");
    video.autoplay = true;
    video.muted = true;
    video.src = urlVideo;
    video.preload = "metadata";
    video.playsInline = true;
    video.addEventListener("loadeddata", () => {
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, width, height);
      video.pause();
      video.remove();
      const imageUrl = canvas.toDataURL("image/png");
      const success = imageUrl.length > 100000;
      if (!isRevokeUrl && success) {
        URL.revokeObjectURL(urlVideo);
      }
      return resolve({
        imageUrl,
        duration: Math.round(video.duration),
      });
    });
  });

export const getDurationVideo = (urlVideo: string) =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = urlVideo;
    video.onloadeddata = () => resolve(Math.round(video.duration));
  });
