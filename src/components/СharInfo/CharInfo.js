import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Error from "../Error/Error";
import Spinner from "../Spinner/Spinner";
import Skeleton from "../Skeleton/Skeleton";
import "./CharInfo.scss";
// import Loki from "../../resources/img/Loki.jpeg";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.onCharLoading(); // чтоб перед запросом показывался спинер
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharListLoated)
      .catch(this.onError);
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onCharListLoated = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "Sorry, comics not found"}
        {comics.map((items, i) => {
          if (i > 9) {
            return;
          }
          return (
            <li key={i} className="char__comics-item">
              {items.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default CharInfo;
