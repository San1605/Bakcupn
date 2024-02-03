
export default function Linkchecker(string){
            try {
              const newUrl = new URL(string);
              return newUrl.protocol === "http:" || newUrl.protocol === "https:";
            } catch (err) {
              return false;
          }
}