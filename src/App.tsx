import React from "react";
import FormikWithHOCExample from "./formik/formik-with-hoc";
import FormikWithHooksExample from "./formik/formik-with-hooks";
import ReactHookFormExample from "./react-hook-form";

function App() {
  return (
    <div className="App">
      <div>
        <h3>formik-hoc</h3>
        <FormikWithHOCExample
          onSubmit={(values) => console.log(values)}
          items={[]}
        />
      </div>
      <div>
        <h3>formik-hooks</h3>
        <FormikWithHooksExample
          onSubmit={(values) => console.log(values)}
          items={[]}
        />
      </div>
      <div>
        <h3>react-hook-form</h3>
        <ReactHookFormExample
          onSubmit={(values) => console.log(values)}
          items={[]}
        />
      </div>
    </div>
  );
}

export default App;
