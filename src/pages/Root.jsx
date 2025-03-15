import { Helmet } from "react-helmet-async";

const Root = () => {
  return (
    <div className="text-6xl">
      <Helmet>
        <title>this is title</title>
      </Helmet>
      Tech Hunt Initiated.....
    </div>
  );
};

export default Root;