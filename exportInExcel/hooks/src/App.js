import AbortController from './Abort/AbortController';
import AbortController1 from './Abort/AbortController1';
import './App.css';
import CodeSpliting from './CodeSpliting/CodeSpliting';
import CodeSplittingTab from './CodeSpliting/CodeSplittingTab';
import ContextApi from './Context/ContextApi';
import Component from './ContextReducer/Component';
import DebThrott from './DebThrott/DebThrott';
import Throttling from './DebThrott/Throttling';
import CounterClass from './ErrorBoundaries/CounterClass';
import ErrorBoundaries from './ErrorBoundaries/ErrorBoundaries';
import ErrorBoundariesUsingReactBoundaries from './ErrorBoundaries/ErrorBoundariesUsingReactBoundaries';
import EventBubbling from './EventDelegation/EventBubbling';
import EventDelagation from './EventDelegation/EventDelagation';
import FormValidation from './FormValidation/FormValidations';
import ReactQuery from './ReactQuery/ReactQuery';
import UseOutlet from './Router/UseOutlet';
import WebworkerUse from './WebWorker/UsingwebWorker';
import WebWorker from './WebWorker/WebWorker';
import Parent from './components/Parent';
import ReactWindow from './listVirtualisation/ReactWindow';
import PdfIframe from './pdf/pdfIframe';
import HTMLSanitizer from './pdftohtml';
import PDFGenerator from './pdftohtml';
function App() {
  return (
    <div className="App">
      {/* <Parent /> */}
      {/* <AbortController/> */}
      {/* <AbortController1/> */}
      {/* <CodeSpliting/> */}
      {/* <CodeSplittingTab/> */}
      {/* <WebWorker/> */}
      {/* <WebworkerUse /> */}
      {/* <PDFGenerator htmlString={htmlString} /> */}
      {/* <DebThrott /> */}
      {/* <UseOutlet /> */}
      <PdfIframe/>
      {/* <Throttling/> */}
      {/* <ReactWindow /> */}
      {/* <ContextApi/> */}
      {/* <Component /> */}
      {/* <EventBubbling /> */}
      {/* <EventDelagation /> */}
      {/* <ReactQuery /> */}
      {/* <FormValidation/> */}

      {/* <ErrorBoundaries>
        <CounterClass />
      </ErrorBoundaries>
      <ErrorBoundaries>
        <CounterClass />
      </ErrorBoundaries> */}

      {/* <ErrorBoundariesUsingReactBoundaries/> */}
    </div>
  );
}
export default App;