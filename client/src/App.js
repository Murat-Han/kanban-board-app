import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

import KanbanBoard from "./components/kanbanboard/KanbanBoard";
import "./App.css";

import { GlobalProvider } from "./services/taskContext";

function App() {
  const loading = useSelector((state) => state.tasks.loading);
  return (
    <GlobalProvider>
      <div className="App">
        {loading ? (
          <ReactLoading
            type="spokes"
            color="#FFF"
            height={200}
            width={100}
            className="spinner"
          />
        ) : (
          <KanbanBoard />
        )}
      </div>
    </GlobalProvider>
  );
}

export default App;
