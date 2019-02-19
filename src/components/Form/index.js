import React from 'react';
import styles from './index.module.css';
import search from '../../img/search.svg';
import PropTypes from 'prop-types';

// Ajax get request function
const ajaxGetRequest = (title, callback) => {
  let xhr = new XMLHttpRequest();

  xhr.open(
    'GET',
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${title}&origin=*&format=json`,
    true
  );

  xhr.send();

  xhr.onreadystatechange = function() {
    if (this.readyState !== 4) return;
    if (this.status !== 200) {
      console.log('Ошибка');
      return;
    }

    // Transformating wiki data into comfortable array
    const data = JSON.parse(this.responseText);
    const finalArray = [];
    for (let index = 0; index < data[1].length; index++) {
      const obj = {
        title: data[1][index],
        snippet: data[2][index],
        link: data[3][index]
      };
      finalArray.push(obj);
    }

    // And then setting state via callback
    callback(finalArray);
  };
};

class Form extends React.Component {
  shouldComponentUpdate(props) {
    this.textInput.value = props.value;
    if (
      navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) != null
    ) {
      return true;
    } else {
    }
    this.textInput.focus();

    return true;
  }

  render() {
    return (
      <form
        className={styles.submitForm}
        onSubmit={e => {
          if (this.textInput.value === this.props.requests[0]) {
            e.preventDefault();
            return;
          }
          ajaxGetRequest(this.textInput.value, data => {
            this.props.setDataState(data);
            this.props.addRequest(this.textInput.value);
          });
          this.props.setValueState(this.textInput.value);
          e.preventDefault();
        }}
      >
        <input
          required
          type="text"
          ref={ref => {
            this.textInput = ref;
          }}
          className={
            this.props.darkTheme
              ? [styles.textInput, styles.textInputDark].join(' ')
              : styles.textInput
          }
        />
        <button className={styles.submitButton} type="submit">
          <img className={styles.searchIcon} src={search} alt="" />
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  setDataState: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  addRequest: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  setValueState: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired
};

export default Form;
