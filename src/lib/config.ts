// CRA embeds this public value at build time. /api requires a reverse proxy.
export const serverApi: string = (process.env.REACT_APP_API_URL || "/api")
    .trim()
    .replace(/\/+$/, "");

export const Messages = {
    error1: "Something went wrong !",
    error2: "Please login first!",
    error3: "Please fulfill all inputs!",
    error4: "Message is empty!",
    error5: "Only images with jpeg, jpg, png format allowed!",
};