import React, { useContext, useEffect, useState } from 'react';
import TempCard from '../../components/TempCard';
import Transition from 'react-transition-group/Transition';
import animateCardIn from '../../animations/animateCardIn';
import userData from '../../data/userData.json';
import PastCard from '../../components/PastCard';
import Context from '../../Context';

const { past_challenges}  = userData;
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
  const { contract, wallet } = useContext(Context);
  const userId = contract.account.accountId;

  const [currChallenges, setCurrChallenges] = useState([]);

  useEffect(() => {
    const getChallenges = async () => {
      try {

        const currentChallenges = await contract.getChallenges({ user_id: userId, is_complete: true});
        setCurrChallenges(currentChallenges); 
      } catch (err) {
        console.error(err);
        console.error(contract, 'contract', contract.getChallenges);
      }
    };

    getChallenges();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h1> Current Challenges </h1>
        <div style={styles.cardContainer}>
        {currChallenges.map( (card, i) => (
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