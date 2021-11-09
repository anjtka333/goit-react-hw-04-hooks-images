import { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import { getPictures } from "./service/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import s from "./App.module.css";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    pictures: [],
    isLoading: false,
    query: "",
    page: 1,
    showModal: false,
    modalTitle: "",
    modalUrl: "",
    largeImageURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query && this.state.page === 1) {
      this.getData();
      this.setState({ pictures: [] });
    }
    if (this.state.page !== prevState.page) {
      this.getData();
    }
    if (this.state.query !== prevState.query && this.state.page !== 1) {
      this.setState({ page: 1, pictures: [] });
    }
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  //usecb
  changeQuery = (query) => {
    this.setState({ query });
  };
  getData() {
    this.setState({ isLoading: true });
    getPictures(this.state.query.trim(), this.state.page)
      .then((pictures) => {
        if (pictures.length === 0) alert("No search result");
        this.setState((prevState) => ({
          pictures: [...prevState.pictures, ...pictures],
        }));
      })
      .catch((err) => this.setState({ error: err }))
      .finally(() => {
        if (this.state.page !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
        this.setState({ isLoading: false });
      });
  }
  handleChangePage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };
  handleModalShow = (largeImageURL, modalTitle) => {
    this.setState({ modalTitle });
    this.setState({ largeImageURL });
    this.toggleModal();
  };
  //usecb
  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.changeQuery} />
        <ImageGallery
          pictures={this.state.pictures}
          cbOnClick={this.handleModalShow}
          cbOpenModal={this.toggleModal}
        />
        {this.state.isLoading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loader type="Hearts" color="#3F51B5" height={80} width={80} />
          </div>
        )}
        {this.state.pictures.length >= 12 && (
          <Button cbOnClick={this.handleChangePage} />
        )}
        {this.state.largeImageURL && (
          <Modal
            onClose={this.toggleModal}
            modalUrl={this.state.largeImageURL}
            modalTitle={this.state.modalTitle}
          />
        )}
      </div>
    );
  }
}

export default App;
