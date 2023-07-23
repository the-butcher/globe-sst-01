import './App.css';
import UserInterfaceComponent from './components/UserInterfaceComponent';

/**
 * App root component
 *
 * TODO :: tooltip
 * TODO :: github repo, add license and a basic readme
 * TODO :: comments to all components and utilities
 * BUG  :: when switching between dark and light, displayed data jumps to initial date
 *
 * @since 22.07.2023
 * @author h.fleischer
 */
function App() {
  return (
    <UserInterfaceComponent />
  );
}

export default App;
