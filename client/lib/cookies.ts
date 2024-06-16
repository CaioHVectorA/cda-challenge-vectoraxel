export function getCookie(name: string) {
    if (typeof document === "undefined") return;
  
    const value = "; " + document.cookie;
    const decodedValue = decodeURIComponent(value);
    const parts = decodedValue.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
  }