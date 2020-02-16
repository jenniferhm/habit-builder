import React from 'react';
import TempCard from '../../components/TempCard';
import Transition from 'react-transition-group/Transition';
import animateCardIn from '../../animations/animateCardIn';
import userData from '../../data/userData.json';
import PastCard from '../../components/PastCard';

console.log(userData, 'adsfjk');
const { past_challenges, current_challenge } = userData;
const styles = {
  cardContainer: {
    display: 'flex',
    flexDirection: 'row wrap',
  }
}

/**
 * Displays all the current challenges this person has completed
 */
const HomePage = (props) => {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',

    }}>
      <h1> Current Challenges </h1>
        <div style={styles.cardContainer}>
        {current_challenge.map( (card, i) => (
          <Transition
            key={`${i}y`}
            in={true}
            appear
            onEnter={(card) => animateCardIn(card, i)}
            timeout={0}
          >
            <TempCard {...card} />
          </Transition>
        ))}
        </div>
      <h1> Past Challenges </h1>
      <div style={styles.cardContainer}>
        {past_challenges.map( (card, i) => (
          <Transition
            key={`${i}x`}
            in={true}
            appear
            onEnter={(card) => animateCardIn(card, i)}
            timeout={0}
          >
            <PastCard {...card} />
          </Transition>
        ))}
      </div>
    </div>
  )
}


export default HomePage;