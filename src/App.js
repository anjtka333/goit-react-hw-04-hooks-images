import { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import { getPictures } from "./service/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import s from "./App.module.css";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal/Modal";

const App = () => {
  // state = {
  //   pictures: [],
  //   isLoading: false,
  //   query: "",
  //   page: 1,
  //   showModal: false,
  //   modalTitle: "",
  //   modalUrl: "",
  //   largeImageURL: "",
  // };

  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalUrl, setModalUrl] = useState("");
  const [largeImageURL, setLargeImageURL] = useState("");

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.query !== prevState.query && this.state.page === 1) {
  //     this.getData();
  //     this.setState({ pictures: [] });
  //   }
  //   if (this.state.page !== prevState.page) {
  //     this.getData();
  //   }
  //   if (this.state.query !== prevState.query && this.state.page !== 1) {
  //     this.setState({ page: 1, pictures: [] });
  //   }
  // }

  useEffect(() => {
    getData();
    // return () => {};
  }, [query, page]);

  const toggleModal = () => {
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
    setLargeImageURL("");
  };

  //usecb
  const changeQuery = (query) => {
    // this.setState({ query });
    setQuery({ query });
  };
  const getData = () => {
    // this.setState({ isLoading: true });
    // getPictures(this.state.query.trim(), this.state.page)
    //   .then((pictures) => {
    //     if (pictures.length === 0) alert("No search result");
    //     this.setState((prevState) => ({
    //       pictures: [...prevState.pictures, ...pictures],
    //     }));
    //   })
    //   .catch((err) => this.setState({ error: err }))
    //   .finally(() => {
    //     if (this.state.page !== 1) {
    //       window.scrollTo({
    //         top: document.documentElement.scrollHeight,
    //         behavior: "smooth",
    //       });
    //     }
    //     this.setState({ isLoading: false });
    //   });
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
    // this.setState((prevState) => ({ page: prevState.page + 1 }));
    setPage((prev) => prev + 1);
  };
  const handleModalShow = (largeImageURL, modalTitle) => {
    setModalTitle({ modalTitle });
    setLargeImageURL({ largeImageURL });
    toggleModal();
    // this.setState({ modalTitle });
    // this.setState({ largeImageURL });
    // this.toggleModal();
  };
  //usecb

  return (
    <div className={s.App}>
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery
        pictures={pictures}
        cbOnClick={handleModalShow}
        cbOpenModal={toggleModal}
      />
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader type="Hearts" color="#3F51B5" height={80} width={80} />
        </div>
      )}
      {pictures.length >= 12 && <Button cbOnClick={handleChangePage} />}
      {largeImageURL && (
        <Modal
          onClose={toggleModal}
          modalUrl={largeImageURL}
          modalTitle={modalTitle}
        />
      )}
    </div>
  );
};

export default App;
