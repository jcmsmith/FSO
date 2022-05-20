import Header from "./components/Header";
import { Content, Total } from "./components/Content";
import { courseData } from "./courseData";

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseData} />
      <Total courseParts={courseData} />
    </div>
  );
};

export default App;
