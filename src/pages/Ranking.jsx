import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  componentDidMount() {
    const { ranking } = this.props;
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const {
      ranking,
    } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <section>
          <img
            data-testid="header-profile-picture"
            src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
            alt="img"
          />
          <h3>
            {ranking.length > 0
            && ranking.sort((a, b) => b.score - a.score).map((item, index) => (
              <div key={ item }>
                <h3 data-testid={ `player-name-${index}` }>{item.name}</h3>
                <h3 data-testid={ `player-score-${index}` }>{item.score}</h3>
              </div>
            ))}
          </h3>
        </section>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Home
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  ranking: state.ranking,
});

Ranking.propTypes = {
  ranking: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Ranking);
