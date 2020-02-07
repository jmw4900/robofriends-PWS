import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import Header from "../components/Header";
import "./App.css";

import { setSearchField, requestRobots } from "../actions";

// const mapStateToProps = state => {
//   return {
//     // searchField: state.searchRobots.searchField
//     searchField: state.searchField
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onSerchChange: event => dispatch(setSearchField(event.target.value))
//   };
// };

const App = () => {
  // const [robots, setRobots] = useState([]);
  const searchField = useSelector(state => state.searchRobots.searchField, []);
  const robots = useSelector(state => state.requestRobots.robots, []);
  const isPending = useSelector(state => state.requestRobots.idPending, []);
  // const error = useSelector(state => state.requestRobots.error, []);

  const dispatch = useDispatch();
  // const [searchfield, setSerchfield] = useState("");

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then(response => response.json())
    //   .then(users => setRobots(users));
    dispatch(requestRobots());
  }, [dispatch]);

  const onSearchChange = event => {
    dispatch(setSearchField(event.target.value));
  };

  const fiteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  // Header is unnecessary one of renders
  return isPending ? (
    <h1 className="tc">Loading...</h1>
  ) : (
    <div className="tc">
      <Header />
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={fiteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
};

export default App;
