  const loopworker = () => {
    const removeInlineStylesAndClasses = (htmlContent) => {
        if (!htmlContent) return "";
        let contentWithoutStyles = htmlContent.replace(/ style=("([^"]*)"|'([^']*)')/g, '');
        contentWithoutStyles = contentWithoutStyles.replace(/<figure/g, '<div').replace(/<\/figure/g, '</div');
        const contentWithDivs = contentWithoutStyles.replace(/ class="[^"]*"/g, '');
        return contentWithDivs;
      };
    onmessage = (event) => {
        const largeHTMLContent = event.data;
        const processedContent = removeInlineStylesAndClasses(largeHTMLContent);
        postMessage(processedContent);
    }
}
  
  let code = loopworker.toString();
  code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
  const blob = new Blob([code], { type: 'application/javascript' });
  const workerScriptURL = URL.createObjectURL(blob);
  export default workerScriptURL;  