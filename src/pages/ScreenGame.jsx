import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './ScreenGame.css';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { requestToken, handleApi, setUserInfo } from '../action/index';
import {
  TRINTA,
  UM,
  MIL,
  SCORE_INIT,
  SCORE_EASY,
  SCORE_MEDIUM,
  SCORE_HARD,
  MAX_QUESTIONS,
} from './constScreenGame';
import '../styles.css';

function ScreenGame(props) {
  const [btnDisable, setBtnDisable] = useState(true);
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState('');
  const [color2, setColor2] = useState('');
  const [Interval, setIntervallGame] = useState(TRINTA);
  const [countQuestions, setCountQuestions] = useState(1);

  const {
    player: { name, email, score, total, assertions },
    questions,
  } = props;

  useEffect(() => {
    props.handleApi();
    setInterval(() => {
      setIntervallGame((inter) => (inter > 0 ? inter - UM : inter));
    }, MIL);
    return () => clearInterval(Interval);
  }, []);

  useEffect(() => {
    if (Interval <= 0) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [Interval]);

  function checkAnswer({ target }) {
    let difficulty = 0;
    if (questions[index].difficulty === 'easy') {
      difficulty = SCORE_EASY;
    } else if (questions[index].difficulty === 'medium') {
      difficulty = SCORE_MEDIUM;
    } else if (questions[index].difficulty === 'hard') {
      difficulty = SCORE_HARD;
    }

    const isCorrect = target.getAttribute('data-testid').includes('correct');
    if (isCorrect) {
      const newScore = SCORE_INIT + Interval * difficulty;
      const userInfo = {
        name,
        email,
        score: score + newScore,
        total: total + newScore,
        assertions: assertions + 1,
      };
      localStorage.setItem('player', JSON.stringify(userInfo));
      props.dispatchUserInfo(userInfo);
    }
  }

  return (
    <div>
      <header>
        <img
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="img"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">{score}</h3>
      </header>
      {questions.length > 0
        && (
          <div data-testid="answer-options">
            <p data-testid="question-category">{questions[index].category}</p>
            <p data-testid="question-text">{questions[index].question}</p>

            <section data-testid="answer-options">
              <Button
                color="primary"
                outline
                type="button"
                disabled={ Interval <= 0 ? 'disabled' : btnDisable }
                className={ color2 }
                data-testid="correct-answer"
                onClick={ (event) => {
                  checkAnswer(event);
                  setColor2('styleTrue');
                  setColor('styleFalse');
                } }
              >
                {questions[index].correct_answer}
              </Button>

              <Button
                type="button"
                color="primary"
                outline
                className={ color }
                data-testid={ `wrong-answer-${index}` }
                onClick={ (event) => {
                  checkAnswer(event);
                  setColor('styleFalse');
                  setColor2('styleTrue');
                } }
              >
                {questions[index].incorrect_answers[0]}
              </Button>

              <Button
                type="button"
                color="primary"
                outline
                className={ color }
                data-testid={ `wrong-answer-${index}` }
                onClick={ (event) => {
                  checkAnswer(event);
                  setColor('styleFalse');
                  setColor2('styleTrue');
                } }
              >
                {questions[index].incorrect_answers[1]}
              </Button>

              <Button
                type="button"
                color="primary"
                outline
                className={ color }
                data-testid={ `wrong-answer-${index}` }
                onClick={ (event) => {
                  checkAnswer(event);
                  setColor('styleFalse');
                  setColor2('styleTrue');
                } }
              >
                {questions[index].incorrect_answers[2]}
              </Button>
            </section>
          </div>
        )}
      <Button
        data-testid="btn-next"
          color="primary"
    outline
        onClick={ () => {
          const { history } = props;
          setCountQuestions(countQuestions + 1);
          setIntervallGame(TRINTA);
          setIndex(index + 1);
          setColor('');
          setColor2('');
          if (countQuestions === MAX_QUESTIONS) {
            setCountQuestions(0);

            history.push('/feedback');
          }
        } }
        type="button"
      >
        Proxima Pergunta
      </Button>
      <div>
        <p>{`Tempo: ${Interval}`}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  player: state.player,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  RequestToken() {
    dispatch(requestToken());
  },
  dispatchUserInfo(score) {
    dispatch(setUserInfo(score));
  },
  handleApi() {
    dispatch(handleApi());
  },
});

ScreenGame.propTypes = {
  player: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  handleApi: PropTypes.func.isRequired,
  questions: PropTypes.string.isRequired,
  dispatchUserInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);
