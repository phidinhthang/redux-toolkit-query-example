import "./styles.css";
import { PhotoCard } from "./PhotoCard";
import { PhotoTitleInput } from "./PhotoTitleInput";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <PhotoCard photoId={3} />
      <PhotoTitleInput photoId={3} />
    </Provider>
  );
}
