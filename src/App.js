import { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import { getPictures } from "./service/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import s from "./App.module.css";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalTitle, setModalTitle] = useState("");
  const [largeImageURL, setLargeImageURL] = useState("");

  useEffect(() => {
    if (query) {
      getData();
    }
  }, [query, page]);

  const changeQuery = (query) => {
    setPictures([]);
    setPage(1);
    setQuery(query);
  };

  const getData = () => {
    setIsLoading(true);
    getPictures(query.trim(), page)
      .then((pictures) => {
        if (pictures.length === 0) alert("No search result");
        setPictures((prev) => [...prev, ...pictures]);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        if (page !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
        setIsLoading(false);
      });
  };
  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };
  const handleModalShow = (largeImageURL = "", modalTitle = "") => {
    setModalTitle(modalTitle);
    setLargeImageURL(largeImageURL);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery pictures={pictures} cbOnClick={handleModalShow} />
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader type="Hearts" color="#3F51B5" height={80} width={80} />
        </div>
      )}
      {pictures.length >= 12 && <Button cbOnClick={handleChangePage} />}
      {largeImageURL && (
        <Modal
          onClose={handleModalShow}
          modalUrl={largeImageURL}
          modalTitle={modalTitle}
        />
      )}
    </div>
  );
};

export default App;
