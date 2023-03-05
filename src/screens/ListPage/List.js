import HeaderList from "./components/HeaderList";
import { Fragment } from "react";
import CardContainer from "./components/CardContainer";

export default function List() {
  return (
    <Fragment>
      <HeaderList />
      <CardContainer />
    </Fragment>
  );
}
